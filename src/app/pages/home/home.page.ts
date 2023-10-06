import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {LoaderComponent} from "../../partials/loader/loader.component";
import * as THREE from "three";
import fragmentShader from '../../utils/glsl/background/fragment.glsl';
import vertexShader from '../../utils/glsl/background/vertex.glsl';
import fragmentShaderPoints from '../../utils/glsl/points/fragment.glsl';
import vertexShaderPoints from '../../utils/glsl/points/vertex.glsl';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements AfterViewInit {
  @ViewChild('rendererWrapper') rendererWrapper?: ElementRef;
  private scene: THREE.Scene = new THREE.Scene;
  private camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1000, 1000);
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    powerPreference: "high-performance",
    antialias: true,
    alpha: false
  });
  private clock: THREE.Clock = new THREE.Clock();
  private rafID?: number;

  ///objects
  private geometryBg?: THREE.PlaneGeometry;
  private materialBg?: THREE.ShaderMaterial;
  private meshObjectBg?: THREE.Mesh;

  private geometryBgPoints?: THREE.BufferGeometry;
  private materialBgPoints?: THREE.ShaderMaterial;
  private meshObjectBgPoints?: THREE.Points;
  private numberOfElementsBg: number = 1500;

  ngAfterViewInit() {
    this.init();
    LoaderComponent.toggleDisplay(false);
  }

  private init(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.setupCamera();
    this.addLights();
    this.addBackground();
    this.addBgPoints();
    this.animate();

    this.rendererWrapper?.nativeElement.append(this.renderer.domElement);
  }

  private setupCamera(): void {
    this.camera.position.set(0, 0, 0);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);
  }

  private addLights(): void {
    const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);

    const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-7, 10, 15)
    this.scene.add(directionalLight);
  }

  ///add objects

  ///background
  private addBackground(): void {
    this.geometryBg = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.materialBg = new THREE.ShaderMaterial({
      extensions: {
        derivatives: true,
      },
      uniforms: {
        u_coords: {value: new THREE.Vector4(0.3723, 0.5784, 0.4015, 0.3871)},
        u_color0: {value: new THREE.Vector3(0.0784, 0.1686, 0.3098)},
        u_color1: {value: new THREE.Vector3(0.3137, 0.3804, 1)},
        u_color2: {value: new THREE.Vector3(0.5882, 1, 0.5373)},
        u_magnitude: {value: 1.403},
        u_amplitude: {value: 0.135},
        u_smooth: {value: 0.784},
        u_time: {value: 0.0},
        u_distance: {value: 0.2380},
        u_speed: {value: 0.087},
        u_alpha: {value: 1.0}
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });
    this.meshObjectBg = new THREE.Mesh(this.geometryBg, this.materialBg);
    this.scene.add(this.meshObjectBg);
  }

  private animateBackground(): void {
    if (this.materialBg) {
      const e: number = 0.15 * this.clock.getElapsedTime() * 5;
      const t: number = 0.5 + 0.15 * Math.sin(e + 1.403);
      const n: number = 0.5 + 0.15 * Math.cos(e + 1.403);
      const i: number = 0.5 + 0.15 * Math.cos(e + 0.135);
      const r: number = 0.5 + 0.15 * Math.sin(e + 0.135);

      this.materialBg.uniforms['u_coords'].value.x += (t - this.materialBg.uniforms['u_coords'].value.x) * .05;
      this.materialBg.uniforms['u_coords'].value.y += (n - this.materialBg.uniforms['u_coords'].value.y) * .05;
      this.materialBg.uniforms['u_coords'].value.z += (i - this.materialBg.uniforms['u_coords'].value.z) * .05;
      this.materialBg.uniforms['u_coords'].value.w += (r - this.materialBg.uniforms['u_coords'].value.w) * .05;
      this.materialBg.uniforms['u_time'].value = this.clock.getElapsedTime() * 5;
    }
  }

  ///points
  private randomBetween(e: number, t: number): number {
    return e + Math.random() * (t - e);
  }

  ///bg points
  private addBgPoints(): void {
    ///material
    this.materialBgPoints = new THREE.ShaderMaterial({
      extensions: {
        derivatives: true,
      },
      uniforms: {
        u_color1: {value: new THREE.Vector3(0, 0.7804, 0.9843)},
        u_color2: {value: new THREE.Vector3(0.2745, 0.3529, 0.7961)},
        u_range: {value: new THREE.Vector3(0.5, 0.5, 0.5)},
        u_speed: {value: 0.12},
        u_size: {value: 3},
        u_pr: {value: 1.6251},
        u_alpha: {value: 0.58},
        u_time: {value: 0},
      },
      depthTest: false,
      depthWrite: false,
      transparent: true,
      fragmentShader: fragmentShaderPoints,
      vertexShader: vertexShaderPoints
    });

    ///geometry
    this.geometryBgPoints = new THREE.BufferGeometry();
    const positions = new Float32Array(3 * this.numberOfElementsBg);
    const colors = new Float32Array(4 * this.numberOfElementsBg);
    const params = new Float32Array(4 * this.numberOfElementsBg);

    for (let i = 0; i < this.numberOfElementsBg; i++) {
      positions[3 * i] = this.randomBetween(-1, 1);
      positions[3 * i + 1] = this.randomBetween(-1, 1);
      positions[3 * i + 2] = this.randomBetween(-1, 1);

      const randomValue = this.randomBetween(0, 1);
      colors[4 * i] = randomValue;
      colors[4 * i + 1] = randomValue;
      colors[4 * i + 2] = randomValue;
      colors[4 * i + 3] = Math.random();

      params[4 * i] = this.randomBetween(-1, 1);
      params[4 * i + 1] = this.randomBetween(-1, 1);
      params[4 * i + 2] = this.randomBetween(-1, 1);
      params[4 * i + 3] = this.randomBetween(-1, 1);
    }

    this.geometryBgPoints.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.geometryBgPoints.setAttribute("a_color", new THREE.BufferAttribute(colors, 4));
    this.geometryBgPoints.setAttribute("a_param", new THREE.BufferAttribute(params, 4));

    this.meshObjectBgPoints = new THREE.Points(this.geometryBgPoints, this.materialBgPoints);
    this.scene.add(this.meshObjectBgPoints);
  }

  private animateBgPoints(): void {
    if (this.materialBgPoints) {
      this.materialBgPoints.uniforms['u_time'].value = this.clock.getElapsedTime() * 0.5;
    }
  }

  ///global animations
  private animate(): void {
    this.renderer.render(this.scene, this.camera);
    this.animateBackground();
    this.animateBgPoints();
    this.rafID = requestAnimationFrame(this.animate.bind(this));
  }

  ///events
  @HostListener('window:resize') onResize(): void {
    this.camera.updateProjectionMatrix();
    console.log(window.innerWidth, window.innerHeight);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      if (this.rafID) {
        cancelAnimationFrame(this.rafID);
        this.rafID = undefined;
      }
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }, 300); ///Wait for the animation to finish
  }
}

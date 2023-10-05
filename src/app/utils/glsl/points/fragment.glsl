uniform vec3 u_color1;
uniform vec3 u_color2;
uniform float u_alpha;
uniform float u_threshold;
varying vec4 vColor;
void main() {
  vec3 color = mix(u_color1, u_color2, vColor.rgb);
  float c = smoothstep(1., 0., distance(gl_PointCoord, vec2(0.5)) * 2.);
  float a = u_alpha * c * vColor.a;
  if (a <= 0.001) discard;
  gl_FragColor = vec4(color, a);
}

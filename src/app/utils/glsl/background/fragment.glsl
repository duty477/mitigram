#define PI 3.1415926538

// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec3 permute(vec3 x) {
  return mod289(((x*34.0)+10.0)*x);
}
float snoise2d(vec2 v) {
  const vec4 C = vec4(0.211324865405187, // (3.0-sqrt(3.0))/6.0
  0.366025403784439, // 0.5*(sqrt(3.0)-1.0)
  -0.577350269189626, // -1.0 + 2.0 * C.x
  0.024390243902439);// 1.0 / 41.0

  // First corner
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);

  // Other corners

  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0

  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;

  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  // Permutations

  i = mod289(i);// Avoid truncation effects in permutation

  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
  + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m*m;
  m = m*m;

  // Gradients: 41 points uniformly over a line, mapped onto a diamond.

  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  // Normalise gradients implicitly by scaling m

  // Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  // Compute final noise value at P

  vec3 g;
  g.x = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

uniform vec4 u_coords;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform float u_magnitude;
uniform float u_amplitude;
uniform float u_smooth;
uniform float u_time;
uniform float u_distance;
uniform float u_speed;
uniform float u_alpha;
varying vec2 vUv;
void main() {
  float t = u_time * u_speed;
  float n = (snoise2d(vUv * u_magnitude - t) + 1.) * 0.5 * u_amplitude;
  float n1 = (snoise2d(vUv * u_magnitude + t + u_amplitude) + 1.) * 0.5 * u_amplitude;
  vec2 coords0 = u_coords.xy + n;
  float d = smoothstep(distance(coords0, vUv), distance(coords0, vUv) + u_smooth, u_distance);
  vec2 coords1 = u_coords.zw + n1;
  float d1 = smoothstep(distance(coords1, vUv), distance(coords1, vUv) + u_smooth, u_distance);
  vec3 color = mix(u_color0, u_color1, d * u_alpha);
  color = mix(color, u_color2, d1 * u_alpha);
  float alpha = 1.;
  gl_FragColor = vec4(color, alpha);
}

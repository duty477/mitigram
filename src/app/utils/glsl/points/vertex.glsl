#define PI 3.1415926538

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
uniform vec3 u_range;
uniform float u_time;
uniform float u_speed;
uniform float u_size;
uniform float u_pr;
attribute vec4 a_param;
attribute vec4 a_color;
attribute vec3 a_index;
varying vec4 vColor;
void main() {
  float t = u_time * u_speed;
  vec3 pos = position * u_range;
  pos.x += sin(t * a_param.w + u_pr) * a_param.x;
  pos.y += cos(t * a_param.w + u_pr) * a_param.y;
  pos.z += sin(t * a_param.w + u_pr) * a_param.z;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (u_size / length(mvPosition.xyz));
  gl_Position = projectionMatrix * mvPosition;
  vColor = a_color;
}

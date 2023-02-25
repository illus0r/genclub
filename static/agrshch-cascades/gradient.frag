precision mediump float;
varying vec2 vTexCoord;

uniform vec3 color1;
uniform vec3 color2;

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 coord = vTexCoord;

  float r = rand(coord);
  vec3 n = (vec3(r,r,r)*2.0 - vec3(r,r,r)) * 0.15;
  float mask = coord.y;
  vec3 gradient = mix(color1, color2, mask);

  gl_FragColor = vec4(gradient+n, 1.0 );
}
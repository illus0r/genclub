#version 300 es
precision highp float;
/* uniform float rndjs[8]; */
uniform sampler2D tx;
uniform vec2 res;
out vec4 o;

uniform float time;
uniform float frame;

#define PI 3.14159265
#define PI2 6.2831853
#define rnd(x) fract(1.1e4*sin(mod(111.1*(x),3.14)+.1))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define F float
#define V vec2
#define W vec3
#define N normalize
#define L length
#define S smoothstep
/* #define AACount 8. */
/* #define sabs(x) sqrt((x)*(x)+.01) */
/* #define smin(a,b) ((a+b-sabs(a-b))*.5) */
/* #define sfloor(x) (floor(x)+smoothstep(0.,1.,fract(x))) */

#define tex(xx, yy) texture(tx, fract(uv + vec2(xx, yy)/res))
#define col(c) (c-cos((vec3(c) + off) * 2. * PI) * mul + add)

void main() {
	vec3 mul = vec3(.5, .5, .5);
	vec3 add = vec3(.5, .5, .5);
	vec3 off = vec3(.6, .8, .3);
	vec2 uv=gl_FragCoord.xy/res;
	/* uv = floor(uv*512.)/512.; */

	o.rgb=col(texture(tx, uv).r*1.);
	/* o=pow(o,vec4(40)); */
	/* o=1.-o; */
	/* F id = o.r;//floor(o.r*4.)/4.; */
	/* o.rgb = col(id); */
	o.a=1.;
}

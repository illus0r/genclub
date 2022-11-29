#version 300 es
precision highp float;
/* uniform float rndjs[8]; */
uniform sampler2D tx;
uniform vec2 res;
out vec4 o;

uniform float frame;
uniform float time;

#define PI 3.14159265
#define PI2 6.2831853
/* #define rnd(x) fract(1.1e4*sin(mod(111.1*(x),3.14)+.1)) */
#define rnd(x) fract(54321.987 * sin(987.12345 * x + 1.))

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

#define tex(xx, yy) texture(tx, fract((gl_FragCoord.xy + vec2(xx, yy))/res))

void main() {
	vec2 uv=gl_FragCoord.xy/res;

	if(frame>1.){
		float id = tex(0,0).r;
		V offset = V(0);
		float tt = floor(time*6.61 + id);
		/* offset[0] = int(rnd(id + .1 + tt) * 2.) * 2 - 1; */ 
		offset[int(rnd(id + tt) * 2.)] = floor(fract(rnd(id + .1 + tt))*3.) - 1.; 
		o = tex(offset.x, offset.y); 
		/* o = tex(0,1); */ 
		o.a = 1.;
	  if(rnd(id+L(uv))>.99)o=vec4(rnd(id+L(uv)+1.));
		return;
	}
	/* else{ */
	o=vec4(rnd(dot(V(7,5),floor(uv*20.)/20.)));
	/* o.a=1.; */
	/* o=fract(o); */
	/* } */
	/* o+=floor(sin(length(uv)*16.)*8.)/9.9; */
	o.a=1.;
}

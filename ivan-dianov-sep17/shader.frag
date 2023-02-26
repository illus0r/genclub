#version 300 es
precision highp float;
uniform vec2 res;
uniform vec2 mouse;
uniform float frame;
uniform float time;
uniform float rndjs[5];
uniform sampler2D tx;
precision lowp sampler3D;
uniform sampler3D vox;
uniform sampler2D vox2;
uniform vec3 palette[5];
out vec4 o;

#define rnd(x) fract(1.1e4*sin(mod(111.1*(x),3.14)+.1))
#define rnd2D(X) fract(1e5*sin(dot(mod(X,PI),vec2(9.,PI))+.1))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define PI 3.14159265

float noise(vec3 p) {
  vec3 ip=floor(p),s=vec3(7,157,113); p-=ip;
  vec4 h=vec4(0,s.yz,s.y+s.z)+dot(ip,s);
  h=mix(fract(sin(h)*43758.5), fract(sin(h+s.x)*43758.5),p.x);
  h.xy=mix(h.xz,h.yw,p.y);
  return mix(h.x,h.y,p.z);
}

float sigmoid(float x) {
	return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14),0.,1.);
}

#define AA 100
void main() {
	mat4 m = mat4(
			palette[0].r, palette[1].r, palette[2].r, palette[3].r,
			palette[0].g, palette[1].g, palette[2].g, palette[3].g,
			palette[0].b, palette[1].b, palette[2].b, palette[3].b,
			1,						1,						1,						1
			);
  vec2 duv = vec2(0);
	for(int a=0; a<AA; a++, duv=fract(duv+vec2(1.6180339887, 1.324717957))){
		vec4 col = vec4(0);
		vec2 uv=((gl_FragCoord.xy+(duv-.5)*(80.*pow(noise(99.*rndjs[0] + gl_FragCoord.xyy/res.xyy),4.+2.)))*2.-res)/res.y;
		/* if(uv.y<-.5){o.rgb=palette[int(uv.x*3.)];o.a=1.;return;} */

		for(float i=0.;i<13.;i++){
			uv*=1.+.5*noise(uv.xyx+99.*rndjs[0]);
			/* uv+=1.;//+time*.01; */
			/* uv*=rot(i+rndjs[0]+time*.0001); */
			vec2 center1 = vec2(rnd(i+rndjs[2]),rnd(i+rndjs[3]))*2.-1.;
			vec2 center2 = vec2(rnd(i+rndjs[3]),rnd(i+rndjs[4]))*2.-1.;
			/* uv.x+=sin(length(uv-center)*200.*rnd(i+rndjs[1]))*.1*smoothstep(.7,1.,noise(uv.xxy+10.)); */
			uv.x+=sin(length(uv-center1)*10.)*.05*noise(uv.xyx+time);
			uv.y+=sin(length(uv-center2)*10.)*.05*noise(uv.xyx-time);
		}

		uv*=1.;
		col.r += smoothstep(.2,.8,noise(uv.xxy));
		col.g += smoothstep(.2,.8,noise(.5*uv.xxy+10.));
		col.b += smoothstep(.2,.8,noise(.9*uv.xxy+20.));
		col.a += smoothstep(.2,.8,noise(.2*uv.xxy+30.));

		/* float maxComp = max(max(col.r,col.g),max(col.b,col.a)); */
		/* if(col.r==maxComp){ */
		/* 	col*=.0; */
		/* 	col.r=1.;maxComp; */
		/* } */
		/* else if(col.g==maxComp){ */
		/* 	col*=.0; */
		/* 	col.g=1.;maxComp; */
		/* } */
		/* else if(col.b==maxComp){ */
		/* 	col*=.0; */
		/* 	col.b=1.;maxComp; */
		/* } */
		/* else if(col.a==maxComp){ */
		/* 	col*=.0; */
		/* 	col.a=1.;maxComp; */
		/* } */

		/* mat4 emph = mat4( */
		/* 		.6,-0,-0,-0, */
		/* 		-0,.6,-0,-0, */
		/* 		-0,-0,.6,-0, */
		/* 		-0,-0,-0,.6 */
		/* 		); */
		/* col*=emph; */

		/* col*=.5; */

		col*=col*col;
		col.rgba*=m;
		/* col*=1.5; */
		/* col.r=sigmoid(col.r); */
		/* col.g=sigmoid(col.g); */
		/* col.b=sigmoid(col.b); */
		/* col.a=sigmoid(col.a); */



		o+=clamp(col, 0., 1.);
	}
	o/=float(AA);
	o.a=1.;
}




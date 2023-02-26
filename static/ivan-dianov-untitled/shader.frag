#version 300 es
precision highp float;
uniform vec2 res;
uniform vec2 mouse;
uniform float frame;
uniform float time;
uniform float rndjs[5];
uniform sampler2D tx;
precision lowp sampler3D;
uniform vec3 palette[5];
out vec4 o;

#define rnd(x) fract(1.1e4*sin(mod(111.1*(x),3.14)+.1))
#define rnd2D(X) fract(1e5*sin(dot(mod(X,PI),vec2(9.,PI))+.1))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define PI 3.14159265

float noise(vec3 p) {
  vec3 ip=floor(p),s=vec3(7,157,113); p=smoothstep(0.,1.,fract(p));
  vec4 h=vec4(0,s.yz,s.y+s.z)+dot(ip,s);
  h=mix(fract(sin(h)*43758.5), fract(sin(h+s.x)*43758.5),p.x);
  h.xy=mix(h.xz,h.yw,p.y);
  return mix(h.x,h.y,p.z);
}

float sigmoid(float x) {
	return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14),0.,1.);
}

#define AA 1
void main() {
  vec2 duv = vec2(0);
	for(int a=0; a<AA; a++, duv=fract(duv+vec2(1.6180339887, 1.324717957))){
		vec4 col = vec4(0);
		/* vec2 uv=((gl_FragCoord.xy+(duv-.5)*(80.*pow(noise(99.*rndjs[0] + gl_FragCoord.xyy/res.xyy),4.+2.)))*2.-res)/res.y; */
		vec2 uv=((gl_FragCoord.xy+(duv-.5))*2.-res)/res.y;




		/* float N = 12.; */
		/* for(float i=0.;i<N;i++){ */
		/* 	uv+=9.; */
		/* 	uv*=.55*2.; */
		/* 	float k = pow(1./.56/2.,N-1.-i); */
		/* 	uv.x+=k*noise(uv.xxy+vec3(-time,time,time)*k*.1+00.+19.*rndjs[0]); */
		/* 	uv.y+=k*noise(uv.xxy+vec3(-time,time,time)*k*.1+10.+29.*rndjs[0]); */
		/* } */
		/* 	col.r += noise(uv.xxy+vec3(-time,time,time)*.1+00.+19.*rndjs[0]); */
		/* 	col.g += noise(uv.xxy+vec3(-time,time,time)*.1+10.+29.*rndjs[0]); */
		/* 	col.b += noise(uv.xxy+vec3(-time,time,time)*.1+20.+39.*rndjs[0]); */
		/* 	col.a += noise(uv.xxy+vec3(-time,time,time)*.1+30.+49.*rndjs[0]); */

		/* col += noise(col.rbg*300.)*8.*.1; */
		/* col.r += noise(col.rrr*300.*.05)*8.*.05; */
		/* col.g += noise(col.ggg*300.*.05)*8.*.05; */
		/* col.b += noise(col.bbb*300.*.05)*8.*.05; */
		/* col.a += noise(col.aaa*300.*.05)*8.*.05; */
		for(float i=0.;i<(rndjs[3]*10.+10.);i++){
			/* vec2 center1 = vec2(rnd(i+rndjs[2]),rnd(i+rndjs[3]))*2.-1.; */
			vec2 center1 = vec2(
					noise(vec2(time*.1+i/13., i*22.22+.1).xyx+rndjs[2]),
					noise(vec2(time*.1+i/13.*1.6,-i*99.99+.1).xyx+rndjs[3])
					)*2.-1.;
			vec2 center2 = vec2(
					noise(vec2(time*.1+i/13., i*33.33+.2).xyx+rndjs[2]),
					noise(vec2(time*.1+i/13.*1.6,-i*88.88+.2).xyx+rndjs[3])
					)*2.-1.;
			center1*=1.5;
			center2*=1.5;
			/* vec2 center2 = vec2(rnd(i+rndjs[3]),rnd(i+rndjs[4]))*2.-1.; */
			vec2 uv1=uv-center1;
			vec2 uv2=uv-center2;
			/* float c = fract((atan(uv1.y,uv1.x)-atan(uv2.y,uv2.x))/2./PI); */
			float c=-length(center1-center2)+length(uv1)+length(uv2);
			/* if(c<.0001){o-=o;o.a=1.;return;} */
			c=pow(abs(c),.5);
			c=sin(c*(512.*rndjs[2] + 64.)*(.1+rnd(i)*rnd(i)))/c;
			col[int(i)%4]+=c;
			/* return; */
			/* col+=c; */
		}
		/* col=pow(col,vec4(2)); */
		/* col=normalize(col); */
		/* col=col*2.-1.; */
		/* col.rg*=rot(time*.7+1.); */
		/* col.rb*=rot(time*.5); */
		/* col.ba*=rot(time*.3); */
		/* col=col*.5+.5; */
		col=pow(col,vec4(4));
		col=normalize(col);
		col=pow(col,vec4(4));
		col=normalize(col);
		col=pow(col,vec4(4));
		col=normalize(col);
		col=pow(col,vec4(4));
		col=normalize(col);

		mat4 m = mat4(
				palette[0].r, palette[1].r, palette[2].r, palette[3].r,
				palette[0].g, palette[1].g, palette[2].g, palette[3].g,
				palette[0].b, palette[1].b, palette[2].b, palette[3].b,
				1,						1,						1,						1
				);

		for(int i=0;i<3;i++)m[i]=pow(m[i],vec4(2.4));
		col.rgba*=m;
		col = pow(col,1./vec4(2.4));


		o+=clamp(col, 0., 1.);
	}
	o/=float(AA);
	o.a=1.;
}





// 	this.resizeCanvasToDisplaySize = () => {
// 		let cnv = gl.canvas
// 		const pixelDensity = 1 // devicePixelRatio
// 		// in production use:
// 		// const pixelDensity = devicePixelRatio
// 		const displayWidth	= cnv.clientWidth * pixelDensity
// 		const displayHeight = cnv.clientHeight * pixelDensity

// 		// Check if the cnv is not the same size.
// 		const needResize = cnv.width !== displayWidth ||
// 			cnv.height !== displayHeight;

// 		if (needResize) {
// 			// Make the cnv the same size
// 			cnv.width = displayWidth;
// 			cnv.height = displayHeight;
// 		

// 		// Tell WebGL how to convert from clip space to pixels
// 		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
// 		return needResize;
// 	}

export function Gl(canvasSelector) {
	let gl = document.querySelector(canvasSelector).getContext('webgl2')
	gl.getExtension('EXT_color_buffer_float')
	gl.getExtension('OES_texture_float_linear')
	return gl
}

export function Pr(gl, fsStr, vsStr) {
	this.gl = gl
	if(vsStr === undefined){
		vsStr = `#version 300 es
			in vec4 a_p;
			void main(){
					gl_Position = vec4(-1,-1,0,1);
					if(gl_VertexID==1)gl_Position = vec4(3,-1,0,1);
					if(gl_VertexID==2)gl_Position = vec4(-1,3,0,1);
			}`
	}
	if(fsStr === undefined){
		fsStr = `#version 300 es
			precision highp float;
			uniform sampler2D tx;
			uniform vec2 res;
			uniform float time;
			out vec4 o;
			void main(){
				vec2 uv = gl_FragCoord.xy/res;
				o = texture(tx,fract(uv));
				// uv = (gl_FragCoord.xy*2.-res)/res.y;
				// o+=sin(length(uv)*8.+time);
				// o.a=1.;
			}`
	}
	let vs = gl.createShader(gl.VERTEX_SHADER)
	gl.shaderSource(vs,vsStr)
	gl.compileShader(vs)
	let fs = gl.createShader(gl.FRAGMENT_SHADER)
	gl.shaderSource(fs,fsStr)
	gl.compileShader(fs)

	let pr = gl.createProgram()
	gl.attachShader(pr,vs)
	gl.attachShader(pr,fs)
	gl.linkProgram(pr)
	
	pr.draw = (target) => {
		if(target===null || target === undefined){
			gl.useProgram(pr)
			gl.bindFramebuffer(gl.FRAMEBUFFER, null)
			gl.viewport(0,0,gl.canvas.width, gl.canvas.height)
			gl.drawArrays(gl.TRIANGLES,0,3)
		}
		else{ // target is texture
			gl.useProgram(pr)
			let tx = target
			// make fb
			let fb = gl.createFramebuffer()
			gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
			gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tx,0)
			gl.viewport(0,0,tx.w,tx.h)
			gl.drawArrays(gl.TRIANGLES,0,3)
			gl.deleteFramebuffer(fb)
			// gl.clearColor(1,0,0,1)
			// gl.clear(gl.COLOR_BUFFER_BIT)
		}
	}

	pr.setUf = (uf) => {
		gl.useProgram(pr)
		let loc = gl.getUniformLocation(pr,uf.name)
		uf.setGlUniform(gl,loc,uf.value) // value for sampler2d is a JS texture object
	}

	pr.ufs = {}
	pr.uf = (ufs) => {
		gl.useProgram(pr)
		for(let key of Object.keys(ufs)){
			if(key in pr.ufs){
				pr.ufs[key].value = ufs[key]
			}
			else {
				pr.ufs[key] = Uf(key, ufs[key])
			}
			let loc = gl.getUniformLocation(pr, pr.ufs[key].name)
			pr.ufs[key].setGlUniform(gl,loc,pr.ufs[key].value) // value for sampler2d is a JS texture object
		}
	}
	return pr
}


function getUfSetter(type){
	// return (gl,loc,val) => gl.uniform1f(loc,val)
	switch(type){
		case 'float': return (gl,loc,val)=>gl.uniform1f(loc,val)
		case 'vec2': return (gl,loc,val)=>gl.uniform2fv(loc,val)
		case 'sampler2D': return (gl,loc,tx)=>gl.uniform1i(loc,tx.loc)
	}
}

function getUfType(value) {
	if(Array.isArray(value)){
		const len = value.length
		switch(len){
			case 1: return 'float'
			case 2: return 'vec2'
			case 3: return 'vec3'
			case 4: return 'vec4'
		}
	}
	else if(typeof value == 'number'){
		return 'float'
	}
	else if(typeof value === 'object' && 'loc' in value) {// если крякает как текстура, это текстура
		return 'sampler2D'
	}
}

export function Uf(name, value, type) {
	type = type || getUfType(value)
	let setGlUniform = getUfSetter(type)
	let uf = {
		name,
		value,
		type,
		setGlUniform,
	}
	uf.set = (value) => {
		uf.value = value
		return uf
	} 
	return uf
}

let txCounter = 4
export function Tx(gl, options) {
	let tx = gl.createTexture()
	if(options!==undefined){
		tx.w = options.w || 8
		tx.h = options.h || 8
	}
	tx.loc = txCounter // index in unit textures
	gl.activeTexture(gl.TEXTURE0 + txCounter)
	gl.bindTexture(gl.TEXTURE_2D, tx)
	// gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,tx.w,tx.h,0,gl.RGBA,gl.UNSIGNED_BYTE,null)
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,tx.w,tx.h,0,gl.RGBA,gl.FLOAT,null)
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR)
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR)

	txCounter++

  // tx.swap = (tx2) => {
		// gl.activeTexture(gl.TEXTURE0+tx.loc)
		// gl.bindTexture(gl.TEXTURE_2D, tx2)
		// gl.activeTexture(gl.TEXTURE0+tx2.loc)
		// gl.bindTexture(gl.TEXTURE_2D, tx)
		// ;[tx.loc, tx2.loc] = [tx2.loc, tx.loc]
		// // ;[tx, tx2] = [tx2, tx] // Why doesn't it work?
		// return [tx2, tx]
	// }

	return tx
}

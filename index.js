"use strict";

import {loadFileText} from './assets/loadFileText.js'
import {Gl, Pr, Uf, Tx} from './assets/shdr.js'

let isPlaying = true
let mouse = [.5, .5];
let swap = (x) => x

let gl = new Gl('canvas')
let size = 128
gl.canvas.width = size//window.innerWidth
gl.canvas.height = size//window.innerHeight

let fsStr = loadFileText('./shader.frag')
let pr = new Pr(gl,fsStr)
let colorizeStr = loadFileText('./colorize.frag')
let prDr = new Pr(gl,colorizeStr)

// uniforms
// sampler2D ufs are treated differently. uf.value is a texture JS object
let u_tx= [0,0].map(_=>new Tx(gl, {w: size, h: size}))

let timeInit=+new Date()
let timePrev=timeInit
let time=timeInit
let u_frame=0

// S.resizeCanvasToDisplaySize()

setInterval(frame, 10)

function frame() {
	timePrev=time
	time=+new Date()
	u_frame++

	if(isPlaying){
		pr.uf({
			'time': (time-timeInit)/1000,
			'res': [u_tx[0].w, u_tx[0].h],
			'tx': u_tx[0],
			'frame': u_frame,
		})
		pr.draw(u_tx[1])

		prDr.uf({
			'time': (time-timeInit)/1000,
			'res': [gl.canvas.width, gl.canvas.height],
			'tx': u_tx[1],
			'frame': u_frame,
		})
		prDr.draw()
		
		u_tx.reverse()
	}
	else{ 
		// if paused, we skip rendering part
		// and increse timeInit by frame duration to freeze `time-timeInit` difference
		timeInit+=time-timePrev
	}
	// requestAnimationFrame(frame)
}

document.addEventListener('keydown', (event) => {
	if (event.code === 'Space') {
		isPlaying=!isPlaying
		return
	}
}, false)

// window.addEventListener('resize', (event) => {
// 	S.resizeCanvasToDisplaySize()
// }, true)

// gl.canvas.addEventListener('mousemove', e=>{
// 	mouse[0] = e.clientX / gl.canvas.clientWidth
// 	mouse[1] = 1 - e.clientY / gl.canvas.clientHeight
// })

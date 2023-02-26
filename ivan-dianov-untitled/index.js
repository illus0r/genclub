"use strict";

import {loadText} from './assets/loadText.js'
import {Gl} from './assets/gl.js'
import {Pr} from './assets/pr.js'
import {Tx} from './assets/tx.js'
import {palettes} from './assets/palettes.js'


let isPlaying = true
let rndjs
let mouse = [.5, .5];

let palette

function init(){
	rndjs =	[...Array(5)].map(_=>[Math.random()])
palette = palettes[Math.random()*palettes.length | 0].map(color => {
  color = color.slice(1)
  color = color.match(/(.{2})/g).map(v=>Number("0x"+v)/255)
  return color
})
palette = palette.sort(_=>Math.random()-.5)
console.log('palette:',palette)
}
init()

document.addEventListener('click', (event) => {
	init()
}, false)

let gl = new Gl('canvas')
//dpi
gl.canvas.width = window.innerWidth * window.devicePixelRatio * .5
gl.canvas.height = window.innerHeight * window.devicePixelRatio * .5

let fsStr = loadText('./shader.frag')
console.log(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
let pr = new Pr(gl,fsStr)
let prDr = new Pr(gl)

// uniforms
// sampler2D ufs are treated differently. uf.value is a texture JS object
let size = 512
let tx = [...Array(2)].map((d,i)=>new Tx(gl, {w: size, h: size}))
let voxSize = 8
let vox = new Tx(gl, {
	w: voxSize,
	h: voxSize,
	d: voxSize,
	type:'sampler3D',
	filter: gl.LINEAR,
	pixels:[...Array(voxSize**3*4)].map(_=>Math.random()),
})
let vox2 = new Tx(gl, {
	w: 3,
	h: 3,
	type:'sampler2D',
	pixels:[...Array(9*4)].map(_=>Math.random()),
})

let timeInit=+new Date()
let timePrev=timeInit
let timeNew=timeInit
let u_frame=0
// S.resizeCanvasToDisplaySize()


let imgSaveIndex = 0
function frame() {// ← 6
	timePrev=timeNew
	timeNew=+new Date()
	let time = (timeNew-timeInit)/1000
	u_frame++

	if(isPlaying){

		for(let i=0;i<1;i++){
			pr.uf({
				'res': [gl.canvas.width, gl.canvas.height],
				'tx': tx[0],
				'frame': u_frame,
				'time': time,
				'mouse': mouse,
				'palette': palette,
				'rndjs': rndjs,
			})
			// pr.draw([ tx[1], ])
			pr.draw()
		}

		// prDr.uf({
		// 	'res': [gl.canvas.width, gl.canvas.height],
		// 	'tx': tx[1],
		// 	'res_tx': size,
		// 	'frame': u_frame,
		// 	'time': time,
		// 	'mouse': mouse,
		// })
		// prDr.draw()
		
	}
	else{ 
		// if paused, we skip rendering part
		// and increse timeInit by frame duration to freeze `time-timeInit` difference
		timeInit+=timeNew-timePrev
	}
	requestAnimationFrame(frame)
}
frame()
// setInterval(frame,1000)

document.addEventListener('keydown', (event) => {
	if (event.code === 'Space') {
		// frame()
		isPlaying=!isPlaying
		return
	}
}, false)

function saveImage (event){ // doesn't work
	let downloadLink = document.createElement('a');
	downloadLink.setAttribute('download', `img6_${imgSaveIndex++}.png`);
	let canvas = document.querySelector('canvas')
	canvas.toBlob(function(blob) {
		let url = URL.createObjectURL(blob);
		downloadLink.setAttribute('href', url);
		downloadLink.click();
	});
}
// save only if key S is pressed
document.addEventListener('keydown', e=>e.code=='KeyS'?saveImage():0)


// window.addEventListener('resize', (event) => {
// 	S.resizeCanvasToDisplaySize()
// }, true)

gl.canvas.addEventListener('mousemove', e=>{
	mouse[0] = e.clientX / gl.canvas.clientWidth
	mouse[1] = 1 - e.clientY / gl.canvas.clientHeight
})


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






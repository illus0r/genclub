function _line(a) {
    beginShape()
    a.forEach(p => vertex(...p))
    endShape()
}


function _rotate(x, y, x0, y0, alpha) {
    var sin_a = sin(alpha),
        cos_a = cos(alpha)
    return [
        (x - x0) * cos_a - (y - y0) * sin_a + x0,
        (x - x0) * sin_a + (y - y0) * cos_a + y0,
    ]
}


function _scale(x, y, x0, y0, k) {
    return [
        (x - x0) * k + x0,
        (y - y0) * k + y0,
    ]
}


function _mod_line(_) {
    var b = []
    _.a.forEach(p => {
        var r = _rotate(...p, ..._.a[0], _.alpha)
        b.push([r[0] + _.translate_x, r[1] - _.translate_y])
    })
    return b
}


function f(x, amp, wl, ph) {
    return amp * sin(x / wl + ph)
}


function _sine(x1, y1, x2, y2, wl, amp, ph, dw = 1) {
    var sine_len = _norm(x1, y1, x2, y2)
    var a = []
    var y02 = f(sine_len, amp, wl, ph)
    for (var x = 0; x < sine_len; x += W * .006 * dw) {
        var y = f(x, amp, wl, ph)
        a.push([x, y])
    }
    a.push([sine_len, y02])
    var actual_sine_len = _norm(...a[0], ...a[a.length - 1])
    a = a.map(p =>
        _scale(p[0], p[1] - a[0][1], 0, 0, sine_len / actual_sine_len)
    )

    var ax = a[a.length - 1][0] - a[0][0]
    var ay = a[a.length - 1][1] - a[0][1]
    var bx = x2 - x1
    var by = y2 - y1
    var alpha = atan2(by * ax - bx * ay, ax * bx + ay * by)
    return _mod_line({
        a: a,
        translate_x: x1,
        translate_y: -y1,
        alpha: alpha,
    })
}


function _to_shapes(lines) {
    // each odd line is reversed
    var shapes = []
    for (var i = 0; i < lines.length - 1; i++)
        shapes.push([...lines[i], ...lines[i + 1]])
    return shapes
}


function _norm(x1, y1, x2, y2) {
    return sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2))
}
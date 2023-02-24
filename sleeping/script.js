var SEED, W, H;

function setup() {
    //Math.random = fxrand
    noLoop()
    SEED = random() * 23811415
    //SEED = fxrand() * 23811415
    console.log(SEED)
    __draw()
}

function setup_canvas() {
    W = windowWidth
    H = windowHeight
    createCanvas(W, H)
}

function get_config() {
    return {}
}

function __draw(w = null) {
    randomSeed(SEED)
    noiseSeed(SEED)
    setup_canvas(w)
    _ = get_config()
    generate(_)
}

function generate(_) {
    background(255, 240, 228)
    noFill()
    stroke(77)
    strokeWeight(.002 * H)
    push()
    var ph = 2 * PI * noise(0 / 11)
    var amp = (.05 + .2 * noise(0 / 11 + 5415)) * H
    var wl = (.05 + .2 * noise(0 / 11 + 415)) * H
    var dw = 3.7
    var y = -H * .1
    var dy = H * .25

    var s1 = _sine(W * .2, y, W * 1.4, y, wl, amp, ph, dw = dw)
    var s2 = _sine(W * .2, y + dy, W * 1.4, y + dy, wl, amp, ph, dw = dw)

    translate(-W * .3, 0)
    odd = false
    over = false
    var seeed = 1
    for (y = y + dy; y < H * 1.7; y += dy + H * random(-.05, .05)) {
        seeed += random(1235, 543114)
        draw_between(over, odd, s1, s2, seed = seeed)
        translate(
            W * random(-.03, .03),
            H * random(-.06, -.03),
        )
        s1 = s2

        ph = 2 * PI * noise(y / (.1 * H))
        var amp = (.05 + .1 * noise(y / (.01 * H) + 5415)) * H
        var wl = (.05 + .2 * noise(y / (.006 * H) + 415)) * H

        var s2 = _sine(W * .2, y + dy, W * 1.4, y + dy, wl, amp, ph, dw = dw)
        odd = !odd
    }
    pop()

    var tx, ty
    push()
    translate(
        tx = W * random(),
        tx = H * random(),
    )
    var h = random(191, 210)
    www(h)
    pop()

    var n = random(7, 19)

    var rr = H * .8
    for (var i = 0; i < n; i++) {
        var ph = random(2 * PI)
        var amp = random(.02, .04) * H
        var wl = random(.04, .1) * H

        var x1 = random(-.2, .7) * W
        var x2 = random(.3, 1.7) * W
        var y1 = random(-.2, .7) * H
        var y2 = random(.3, 1.7) * H
        var s1 = _sine(x1, y1, x2, y2, wl, amp, ph)
        var lines = []
        lines.push(s1)
        _line(s1)
        var s1 = _sine(x1, y1, x2, y2, wl, -amp, ph).reverse()
        lines.push(s1)
        _line(s1)
        var shapes = _to_shapes(lines)
        fill(255, 240, 228)
        shapes.forEach(sh => {
            beginShape()
            sh.forEach(p => vertex(...p))
            endShape(CLOSE)
        })
    }
    translate(
        W * random(),
        H * random(),
    )
    h = random(313, 360)
    www(h)
}

function layer(over, odd, s1, s2, amp, wl, seed = 0) {
    var n = min(s1.length, s2.length)
    var sines = []
    for (var i = 0; i < n; i++) {
        if (!over && (
                (odd && i % 20 < random(10)) ||
                (!odd && i % 20 > random(20))))
            continue
        var ph = 2 * PI * noise(i / 31 + seed * 4)
        var _amp = amp * (.5 + .5 * noise(seed + i / 27))
        var _wl = wl * (1.8 + .5 * noise(seed * 2 + i / 67))
        var s3 = _sine(...s1[i], ...s2[i], _wl, _amp, ph, dw = 1.)
        if (!over)
            _line(s3)
        i % 2 && s3.reverse()
        sines.push(s3)
    }
    if (!over)
        return
    var shapes = _to_shapes(sines)
    fill(255, 240, 228)
    shapes.forEach(sh => {
        if (random() > .39) return;
        beginShape()
        sh.forEach(p => vertex(...p))
        endShape(CLOSE)
    })
    noFill()
}

function draw_between(over, odd, s1, s2, seed = 0) {
    var amp = random(.02, .05) * H
    var wl = random(.03, .03) * H
    layer(over, odd, s1, s2, amp, wl, seed = seed)
    var amp = random(.03, .05) * H
    layer(over, odd, s1, s2, amp, wl, seed = seed * 88)

}

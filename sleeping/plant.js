function draw_branch(x1, y1, x2, y2, br, k) {
    strokeWeight(H * .003);
    stroke(1, 0, 22)
    if (k == 0)
        leaf(x1, y1, x2, y2, br)
    else
        line(x1, y1, x2, y2)
    scale = .5
    var x3 = x1 + scale * (x2 - x1) + W * .002
    var y3 = y1 + scale * (y2 - y1) - W * .003
    line(x1 + 1, y1 + 1, x3, y3)
    line(x3, y3, x2 - 1, y2)

}

function leaf(x1, y1, x2, y2, xx) {
    fill(
        (random(xx - 23, xx + 43)) % 360,
        random(63, 100),
        random(23, 96),
    )
    noStroke()
    var w = H * .015
    beginShape()
    vertex(x1, y1)
    bezierVertex(x1, y1, -w, (y1 + y2) / 9, x2, y2)
    vertex(x2, y2)
    bezierVertex(x2, y2, w, (y1 + y2) / 9, x1, y1)
    endShape()
}

function draw_tree(x1, y1, x2, y2, fl, br, k) {
    draw_branch(x1, y1, x2, y2, br, k)
    if (k == 0) return;

    for (var i = 0; i < random(9, 19); i++) {
        var angle = random(0, PI / 3) * random([-1, 1])
        var scale = random(.1, .4)
        var shift = random(.01, .99)

        push()
        var dy = shift * (y2 - y1)
        rotate(angle)
        translate(dy * sin(angle), dy * cos(angle))
        var x3 = x1 + scale * (x2 - x1)
        var y3 = y1 + scale * (y2 - y1)
        draw_tree(x1, y1, x3, y3, fl, br, k - 1)
        pop()
    }

}

function www(br) {
    colorMode(HSL);
    var dd = random(7)
    wreath(13 + int(dd / 2), H * random(.6, .8), H * (.11 - dd * .01), br)
    colorMode(RGB);
}

function wreath(n, h, dh, br) {
    var k = 2
    for (var i = 0; i < n; i++) {
        push()
        rotate(PI / 2)
        draw_tree(0, 0, 0, h,
            0, // no berries
            br,
            k)
        pop()
        rotate(-(2 * PI / n) + random([-1, 1]) * random(2 * PI / n * .3))
        translate(dh, 0)

    }
}

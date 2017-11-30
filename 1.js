let N = {}
let E = {}
let W = {}
let S = {}

let o = {
  dir: N,
  dist: {x:0,y:0},
}

function left() {
  switch (o.dir) {
    case N: o.dir = W; break;
    case E: o.dir = N; break;
    case S: o.dir = E; break;
    case W: o.dir = S; break;
  }
}

function right() {
  switch (o.dir) {
    case N: o.dir = E; break;
    case E: o.dir = S; break;
    case S: o.dir = W; break;
    case W: o.dir = N; break;
  }
}

function walk(n) {
  let xdir = 0
  let ydir = 0
  switch (o.dir) {
    case N: ydir = +1; break;
    case E: xdir = +1; break;
    case S: ydir = -1; break;
    case W: xdir = -1; break;
  }
  o.dist.x += xdir * n
  o.dist.y += ydir * n
}

function taxicab(s) {

  s.split(',').forEach(e => {
    let [dir, ...s] = e.trim()
    let steps = parseInt(s.join(''), 10)

    if (dir === 'R') {
      right()
    } else {
      left()
    }

    walk(parseInt(steps, 10))
  })

  return o.dist.x + o.dist.y
}

taxicab("R2, L3, R50") //: 55

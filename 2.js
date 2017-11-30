let dirs = {
U : {x: 0, y:-1},
R : {x:+1, y: 0},
D : {x: 0, y:+1},
L : {x:-1, y: 0},
}

let o = {x: 1, y: 1}
let pad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

function clamp(a, x, b) {
  return Math.max(Math.min(x, b), a)
}

function walk(dir) {
  o.x = clamp(0, o.x + dir.x, 2)
  o.y = clamp(0, o.y + dir.y, 2)
}

function solve(input) {
  let code = []

  input.split('\n').forEach(l => {
    l.trim().split('').forEach(c => {
      walk(dirs[c])
    })
    code.push(pad[o.y][o.x])
  })

  return code
}

let input0 = `ULL
RRDDD
LURDL
UUUUD`

solve(input0) //: [1,9,8,5]

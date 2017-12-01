
function init(w, h) {
  let pixels = []
  for (let y=0; y < h; ++y) {
    let col = []
    for (let x=0; x < w; ++x) {
      col.push(' ')
    }
    pixels.push(col)
  }

  return {h, w, pixels}
}

let screen = init(7, 3)

screen //: Object {h:3,w:7,pixels:[[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "]]}

function rect(a, b) {
  for (let y=0; y < b; ++y) {
    for (let x=0; x < a; ++x) {
      screen.pixels[y][x] = '#'
    }
  }
}

rect(3, 2)
screen //: Object {h:3,w:7,pixels:[["#","#","#"," "," "," "," "],["#","#","#"," "," "," "," "],[" "," "," "," "," "," "," "]]}

function rotate_col(a, b) {
  let col = []
  for (let y=0; y < screen.h; ++y) {
    col.push(screen.pixels[y][a])
  }

  while (b > 0) {
    col.unshift(col.pop())
    b--
  }

  for (let y=0; y < screen.h; ++y) {
    screen.pixels[y][a] = col[y]
  }

  return col
}

rotate_col(1, 1) //: [" ","#","#"]
screen //: Object {h:3,w:7,pixels:[["#"," ","#"," "," "," "," "],["#","#","#"," "," "," "," "],[" ","#"," "," "," "," "," "]]}

function rotate_row(a, b) {
  let row = screen.pixels[a]

  while (b > 0) {
    row.unshift(row.pop())
    b--
  }

  screen.pixels[a] = row

  return row
}

rotate_row(0, 4) //: [" "," "," "," ","#"," ","#"]
screen //: Object {h:3,w:7,pixels:[[" "," "," "," ","#"," ","#"],["#","#","#"," "," "," "," "],[" ","#"," "," "," "," "," "]]}

rotate_col(1, 1) //: ["#"," ","#"]

function count() {
  let p = 0
  for (let y=0; y < screen.h; ++y) {
    for (let x=0; x < screen.w; ++x) {
      if (screen.pixels[y][x] === '#') {
        p++
      }
    }
  }

  return p
}

count() //: 6

let re_rect = /rect ([0-9]+)x([0-9]+)/
let re_rrow = /rotate row y=([0-9]+) by ([0-9]+)/
let re_rcol = /rotate column x=([0-9]+) by ([0-9]+)/

let funcs = {
  rect, rotate_col, rotate_row
}

function prep(line) {
  let m
  if ((m = re_rect.exec(line))) {
    return ['rect', parseInt(m[1], 10), parseInt(m[2], 10)]
  } else if ((m = re_rrow.exec(line))) {
    return ['rotate_row', parseInt(m[1], 10), parseInt(m[2], 10)]
  } else if ((m = re_rcol.exec(line))) {
    return ['rotate_col', parseInt(m[1], 10), parseInt(m[2], 10)]
  }
}

prep("rect 192x26") //: ["rect",192,26]
prep("rotate row y=0 by 120") //: ["rotate_row",0,120]
prep("rotate column x=30 by 1") //: ["rotate_col",30,1]

function solve(input) {
  input.split('\n').forEach(l => {
    let p = prep(l)
    funcs[p[0]](p[1], p[2])
  })

  return count()
}

let input0 = `rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`

screen = init(7, 3)
solve(input0) //: 6

console.log(screen.pixels.join('\n'))

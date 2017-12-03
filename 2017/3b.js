let a = []

function push(x, y, v) {
  let s
  if (x === 0 && y === 0) {
    s = 1
  }
  else {
    s = get(x - 1, y)
      + get(x + 1, y)
      + get(x - 1, y - 1)
      + get(x    , y - 1)
      + get(x + 1, y - 1)
      + get(x - 1, y + 1)
      + get(x    , y + 1)
      + get(x + 1, y + 1)
  }

  a.push([x, y, s])
}

function get(x, y) {
  for (let [ax, ay, v] of a) {
    if (ax === x && ay === y) {
      return v
    }
  }

  return 0
}

function find(n) {
  for (let [x, y, v] of a) {
    if (v === n) {
      return [x, y]
    }
  }

  throw 'Not in array'
}

let i = 1
let x = 0
let y = 0
let length = 0
let l = 0
while (i < 2000) {
  while (l++ < length) {
    push(x, y++, i++)
  }
  l = 0
  while (l++ < length) {
    push(x--, y, i++)
  }
  l = 0
  while (l++ < length) {
    push(x, y--, i++)
  }
  l = 0
  while (l++ < length) {
    push(x++, y, i++)
  }
  push(x++, y, i++)
  l = 1
  length += 2
}

get(2, -1) //: 26
find(362) //: [-2,-2]

a.find(([x,y,v]) => v > 277678) //: [2,4,279138]

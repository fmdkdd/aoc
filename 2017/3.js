let a = []

Math.sqrt(23) //: 4.795831523312719
Math.sqrt(25) //: 5
Math.sqrt(10) //: 3.1622776601683795

function ring_odd(n) {
  if (n === 1) {
    return 0
  }

  let s = Math.sqrt(n)
  let f = Math.floor(s)
  if (f % 2) {
    if (s === f) {
      return f - 2
    } else {
      return f
    }
  } else {
    return f - 1
  }
}

function ring_idx(n) {
  return Math.ceil(ring_odd(n) / 2)
}

ring_odd(23) //: 3
ring_odd(1) //: 0
ring_odd(2) //: 1
ring_odd(6) //: 1
ring_odd(10) //: 3
ring_odd(25) //: 3

ring_idx(23) //: 2
ring_idx(1) //: 0
ring_idx(6) //: 1

function delta(n) {
  if (n === 1) {
    return 0
  }
  let ro = ring_odd(n)
  let length = ro + 1
  let base = ro * ro
  let q = (n - base) % length

  return Math.abs(q - length/2)
}

delta(21) //: 2
delta(22) //: 1
delta(23) //: 0
delta(24) //: 1
delta(25) //: 2
delta(2) //: 0
delta(3) //: 1
delta(9) //: 1
delta(1) //: 0

function solve(n) {
  return ring_idx(n) + delta(n)
}

solve(1) //: 0
solve(12) //: 3
solve(23) //: 2
solve(1024) //: 31

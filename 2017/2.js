let input0 = `5 1 9 5
7 5 3
2 4 6 8`

function mm(l) {
  let a = l.replace(/\t| /g, ' ').split(' ').map(n => parseInt(n, 10))
  console.log(a)
  let M = Math.max.apply(null, a)
  let m = Math.min.apply(null, a)
  console.log(M, m)
  return Math.abs(M - m)
}

mm('5 1 9 5') //: 8

function solve(input) {
  return input.split('\n').map(mm).reduce((s, v) => s + v, 0)
}

solve(input0) //: 18

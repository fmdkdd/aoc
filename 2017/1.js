function solve(input) {
  let m = []
  let nbs = input.split('').map(c => parseInt(c, 10))

  for (let i=0; i < nbs.length; ++i) {
    if (nbs[i] === nbs[(i + 1) % nbs.length])
      m.push(nbs[i])
  }

  return m.reduce((sum, v) => sum + v, 0)
}

solve('1122') //: 3
solve('1111') //: 4
solve('1234') //: 0
solve('91212129') //: 9

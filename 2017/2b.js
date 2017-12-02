let input0 = `5 9 2 8
9 4 7 3
3 8 6 5`

function mm(l) {
  let a = l.replace(/\t| /g, ' ').split(' ').map(n => parseInt(n, 10))
  for (let i=0; i < a.length; ++i) {
    for (let j=i+1; j < a.length; ++j) {
      if (a[i] % a[j] === 0) {
        return a[i] / a[j]
      } else if (a[j] % a[i] === 0) {
        return a[j] / a[i]
      }
    }
  }
  throw 'Invalid row'
}

mm('5 1 9 5') //: 5

function solve(input) {
  return input.split('\n').map(mm).reduce((s, v) => s + v, 0)
}

solve(input0) //: 9

function isT(t) {
  return t[0] + t[1] > t[2]
      && t[0] + t[2] > t[1]
      && t[1] + t[2] > t[0]
}

function solve(input) {
  let count = 0
  input.split('\n').forEach(l => {
    if (isT(l.trim().replace(/ +/g, ' ').split(' ').map(n => parseInt(n.trim(), 10)))) {
      count++
    }
  })

  return count
}

let input0 = `266   88  293
   40  813  103`

solve(input0) //: 1

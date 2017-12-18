let input0 = `0: 3
1: 2
4: 4
6: 4`

function caught(t, range) {
  let half_period = range - 1
  let period = half_period * 2
  let offset = t % period
  if (offset > half_period) {
    offset -= half_period
  }

  return offset
}

caught(0, 3) //: 0
caught(1, 3) //: 1
caught(2, 3) //: 2
caught(3, 3) //: 1
caught(4, 3) //: 0
caught(5, 3) //: 1
caught(6, 3) //: 2
caught(7, 3) //: 1
caught(8, 3) //: 0
caught(9, 3) //: 1
caught(10, 3) //: 2
caught(11, 3) //: 1

function solve(input) {
  let layers = {}
  input.split('\n').map(l => l.split(':'))
    .forEach(([id, range]) => layers[id] = parseInt(range.trim(), 10))
  let keys = Object.keys(layers)
  let max = parseInt(keys[keys.length - 1], 10)

  let severity = 0
  for (let i=0; i <= max; ++i) {
    if (caught(i, layers[i]) === 0) {
      severity += i * layers[i]
    }
  }

  return severity
}

solve(input0) //: 24

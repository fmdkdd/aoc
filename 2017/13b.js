let input0 = `0: 3
1: 2
4: 4
6: 4`

function layer_pos(t, range) {
  let half_period = range - 1
  let period = half_period * 2
  let offset = t % period
  if (offset > half_period) {
    offset -= half_period
  }

  return offset
}

function caught(t, layers, max) {
  for (let i=0; i <= max; ++i) {
    if (layer_pos(t + i, layers[i]) === 0) {
      return true
    }
  }
  return false
}

function solve(input) {
  let layers = {}
  input.split('\n').map(l => l.split(':'))
    .forEach(([id, range]) => layers[id] = parseInt(range.trim(), 10))
  let keys = Object.keys(layers)
  let max = parseInt(keys[keys.length - 1], 10)

  let delay = 0
  while (caught(delay, layers, max)) {
    delay++
  }

  return delay
}

solve(input0) //: 10

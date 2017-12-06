function eq(a, b) {
  for (let i=0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true
}

function solve(input) {
  let blocks = input.replace(/\s/g, ' ').split(' ').map(l => parseInt(l, 10))

  let configs = []
  let loops = 0

  do  {
    configs.push([...blocks])

    let max = -1
    let maxi = -1
    for (let i=0; i < blocks.length; ++i) {
      if (blocks[i] > max) {
        max = blocks[i]
        maxi = i
      }
    }

    blocks[maxi] = 0
    while (max-- > 0) {
      maxi = (maxi + 1) % blocks.length
      blocks[maxi]++
    }

    loops++
  } while (!configs.some(c => eq(c, blocks)))

  let period = 0
  for (let i=0; i < configs.length; ++i) {
    if (eq(blocks, configs[i])) {
      period = configs.length - i
    }
  }

  return [loops, period]
}

solve(`0 2 7 0`) //: [5,4]

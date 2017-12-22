function left(dir) {
  switch (dir) {
    case 'up': return 'left'
    case 'left': return 'down'
    case 'down': return 'right'
    case 'right': return 'up'
  }
}

function right(dir) {
  switch (dir) {
    case 'up': return 'right'
    case 'left': return 'up'
    case 'down': return 'left'
    case 'right': return 'down'
  }
}

function reverse(dir) {
  switch (dir) {
    case 'up': return 'down'
    case 'left': return 'right'
    case 'down': return 'up'
    case 'right': return 'left'
  }
}

function solve(input, iter) {
  input = input.split('\n').map(l => l.split(''))
  let size = input[0].length
  let map = new Map()
  for (let y=0; y < size; ++y) {
    let m = new Map()
    map.set(y, m)
    for (let x=0; x < size; ++x) {
      m.set(x, input[y][x])
    }
  }

  let mid = Math.floor(size / 2)
  let pos = [mid, mid]
  let dir = 'up'
  let infect = 0

  for (let i=0; i < iter; ++i) {
    if (!map.has(pos[0])) {
      map.set(pos[0], new Map())
    }
    let ym = map.get(pos[0])
    if (!ym.has(pos[1])) {
      ym.set(pos[1], '.')
    }
    let s = ym.get(pos[1])
    if (s === '.') {
      dir = left(dir)
      ym.set(pos[1], 'W')
    } else if (s === 'W') {
      ym.set(pos[1], '#')
      infect++
    } else if (s === '#') {
      dir = right(dir)
      ym.set(pos[1], 'F')
    } else {
      dir = reverse(dir)
      ym.set(pos[1], '.')
    }
    switch (dir) {
      case 'up': pos[0]--; break
      case 'down': pos[0]++; break
      case 'left': pos[1]--; break
      case 'right': pos[1]++; break
    }
  }

  return infect
}

console.log(solve(`..#
#..
...`, 10000000))

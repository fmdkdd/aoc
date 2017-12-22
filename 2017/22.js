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

function solve(input, iter) {
  input = input.split('\n').map(l => l.split(''))
  let size = input[0].length
  let map = []
  for (let y=0; y < size; ++y) {
    for (let x=0; x < size; ++x) {
      map.push([y,x,input[y][x]])
    }
  }

  let mid = Math.floor(size / 2)
  let pos = [mid, mid]
  let dir = 'up'
  let infect = 0

  for (let i=0; i < iter; ++i) {
    let idx = map.findIndex(([y,x,v]) => y === pos[0] && x === pos[1])
    let s
    if (idx === -1) {
      s = [pos[0], pos[1], '.']
      map.push(s)
    } else {
      s = map[idx]
    }
    if (s[2] === '#') {
      dir = right(dir)
      s[2] = '.'
    } else {
      dir = left(dir)
      s[2] = '#'
      infect++
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

solve(`..#
#..
...`, 10000)
//: 5587

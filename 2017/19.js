// Heart attack at seeing the puzzle input
// Ugly solution, but hey, it works

let re = /[A-Z]/

function solve(input) {
  let map = input.split('\n').map(l => l.split(''))

  let state = 'down'
  let start = map[0].indexOf('|')
  let pos = [0, start]
  let path = []
  while (state !== 'end') {
    let c = map[pos[0]][pos[1]]
    switch (state) {
      case 'down':
        if (c === '|' || c === '-') {
          pos[0]++
        } else if (c === '+') {
          state = '-+-'
        } else if (re.exec(c)) {
          path.push(c)
          pos[0]++
        } else {
          state = 'end'
        }
        break

      case 'up':
        if (c === '|' || c === '-') {
          pos[0]--
        } else if (c === '+') {
          state = '-+-'
        } else if (re.exec(c)) {
          path.push(c)
          pos[0]--
        } else {
          state = 'end'
        }
        break

      case 'left':
        if (c === '|' || c === '-') {
          pos[1]--
        } else if (c === '+') {
          state = '|+|'
        } else if (re.exec(c)) {
          path.push(c)
          pos[1]--
        } else {
          state = 'end'
        }
        break

      case 'right':
        if (c === '|' || c === '-') {
          pos[1]++
        } else if (c === '+') {
          state = '|+|'
        } else if (re.exec(c)) {
          path.push(c)
          pos[1]++
        } else {
          state = 'end'
        }
        break

      case '-+-':
        let l = map[pos[0]][pos[1]-1]
        let r = map[pos[0]][pos[1]+1]
        if (l === '-' || re.exec(l)) {
          state = 'left'
          pos[1]--
        } else if (r === '-' || re.exec(r)) {
          state = 'right'
          pos[1]++
        } else {
          state = 'end'
        }
        break

      case '|+|':
        let u = map[pos[0]-1] ? map[pos[0]-1][pos[1]] : ''
        let d = map[pos[0]+1] ? map[pos[0]+1][pos[1]] : ''
        if (u === '|' || re.exec(u)) {
          state = 'up'
          pos[0]--
        } else if (d === '|' || re.exec(d)) {
          state = 'down'
          pos[0]++
        } else {
          state = 'end'
        }
        break

      default:
        throw 'Invalid state ' + state
    }
  }

  return path.join('')
}

solve(
`     |
     |  +--+
     A  |  C
 F---|----E|--+
     |  |  |  D
     +B-+  +--+ `)
//: "ABCDEF"

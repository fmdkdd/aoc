let re_s = /s([0-9]+)/
let re_ex = /x([0-9]+)\/([0-9]+)/
let re_p = /p([a-p])\/([a-p])/

function solve(prgs, input) {
  let p = prgs.split('')

  // Parse all the moves first
  let moves = input.split(',').map(d => {
    let m = re_s.exec(d)
    if (m) {
      let n = parseInt(m[1], 10)
      return [0, n]
    } else if ((m = re_ex.exec(d))) {
      let a = parseInt(m[1], 10)
      let b = parseInt(m[2], 10)
      return [1, a, b]
    } else if ((m = re_p.exec(d))) {
      let a = m[1]
      let b = m[2]
      return [2, a, b]
    }
  })

  function run(d) {
    if (d[0] === 0) {
      let off = p.length - d[1]
      let c = p.splice(off)
      p = c.concat(p)
    } else if (d[0] === 1) {
      let a = d[1]
      let b = d[2]
      let t = p[a]
      p[a] = p[b]
      p[b] = t
    } else if (d[0] === 2) {
      let a = p.indexOf(d[1])
      let b = p.indexOf(d[2])
      let t = p[a]
      p[a] = p[b]
      p[b] = t
    }
  }

  // Run for one full cycle
  let seen = []
  let period = 0
  while (!seen.includes(p.join(''))) {
    seen.push(p.join(''))
    moves.forEach(d => run(d))
    period++
  }

  // Look ma!  Very fast!
  return [period, seen[1000000000 % period]]
}

solve('abcde', `s1,x3/4,pe/b`) //: [4,"abcde"]

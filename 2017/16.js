let re_s = /s([0-9]+)/
let re_ex = /x([0-9]+)\/([0-9]+)/
let re_p = /p([a-p])\/([a-p])/

function solve(prgs, input) {
  let p = prgs.split('')

  input.split(',').forEach(d => {
    let m = re_s.exec(d)
    if (m) {
      let n = parseInt(m[1], 10)
      let c = p.splice(p.length - n)
      p = c.concat(p)
    } else if ((m = re_ex.exec(d))) {
      let a = parseInt(m[1], 10)
      let b = parseInt(m[2], 10)
      let t = p[a]
      p[a] = p[b]
      p[b] = t
    } else if ((m = re_p.exec(d))) {
      let a = p.indexOf(m[1])
      let b = p.indexOf(m[2])
      let t = p[a]
      p[a] = p[b]
      p[b] = t
    } else {
      throw 'Invalid dance move ' + d
    }
  })

  return p.join('')
}

solve('abcde', `s1,x3/4,pe/b`) //: "baedc"

function solve(input) {
  let buf = [0]
  let pos = 0
  for (let i=1; i <= 2017; ++i) {
    pos = (pos + input) % buf.length
    pos++
    buf.splice(pos, 0, i)
  }

  return buf[pos+1]
}

solve(3) //: 638

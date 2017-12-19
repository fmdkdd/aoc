// No need to actually fill the the buffer in this one,
// so it becomes linear.

function solve(input) {
  let length = 1
  let pos = 0
  let p1
  for (let i=1; i <= 50000000; ++i) {
    pos = (pos + input) % length
    pos++
    if (pos === 1) {
      p1 = i
    }
    length++
  }

  return p1
}

solve(3) //: 1222153

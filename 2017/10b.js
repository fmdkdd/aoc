function list(n) {
  let l = []
  for (let i=0; i < n; ++i) {
    l.push(i)
  }
  return l
}

function solve(input) {
  let seqs = [].map.call(input, c => c.codePointAt(0)).concat([17,31,73,47,23])

  let sparse = list(256)
  let pos = 0
  let skip = 0
  for (let i=0; i < 64; ++i) {
    for (let s of seqs) {
      let l = []
      for (let i=0; i < s; ++i) {
       l[i] = sparse[(pos+i) % sparse.length]
      }
      for (let i=0; i < s; ++i) {
       sparse[(pos+i) % sparse.length] = l[s-1-i]
      }
      pos += s + skip++
    }
  }

  let dense = []
  for (let i=0; i < 16; ++i) {
    dense.push(sparse.splice(0, 16).reduce((s, v) => s ^ v))
  }

  let hash = dense.map(n => n.toString(16).padStart(2, "0")).join('')

  return hash
}

solve('') === "a2582a3a0e66e6e86e3812dcb672a272" //: true
solve('AoC 2017') === "33efeb34ea91902bb2f59c9920caa6cd" //: true
solve('1,2,3') === "3efbe78a8d82f29979031a4aa0b16a9d" //: true
solve('1,2,4') === "63960835bcdc130f0b66d7ff4f6a5a8e" //: true

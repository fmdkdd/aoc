function list(n) {
  let l = []
  for (let i=0; i < n; ++i) {
    l.push(i)
  }
  return l
}

function knot_hash(input) {
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

  let hash = dense.map(n => n.toString(2).padStart(8, "0")).join('')

  return hash
}

function count(s) {
  return [].filter.call(s, c => c === '1').length
}

count('1101') //: 3

function solve(input) {
  let r = 0
  for (let i=0; i < 128; ++i) {
    r += count(knot_hash(input + '-' + i))
  }
  return r
}

solve('flqrgnkx') //: 8108

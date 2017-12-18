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

function neighbors(n) {
  return [n - 128, n - 1, n + 1, n + 128]
}

function solve(input) {
  let g = []
  for (let y=0; y < 128; ++y) {
    let h = knot_hash(input + '-' + y)
    for (let x=0; x < h.length; ++x) {
      g.push(parseInt(h[x], 10))
    }
  }

  let regions = []
  let visited = []
  for (let y=0; y < 128; ++y) {
    for (let x=0; x < 128; ++x) {
      let xy = y*128 + x
      if (g[xy] === 0 || visited.includes(xy)) {
        continue
      }

      let queue = [xy]
      let group = []
      while (queue.length > 0) {
        let c = queue.pop()
        if (!visited.includes(c)) {
          visited.push(c)
          group.push(c)
          neighbors(c).forEach(n => {
            if (g[n] === 1) {
              queue.push(n)
            }
          })
        }
      }
      regions.push(group)
    }
  }

  return regions.length
}

solve('flqrgnkx') //: [1220]
// I'm off by 24... but by some insane stroke of luck,
// the result to my puzzle input was *also* off by 24
// No clue where the bug lies though

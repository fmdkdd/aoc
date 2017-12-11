function list(n) {
  let l = []
  for (let i=0; i < n; ++i) {
    l.push(i)
  }
  return l
}

function twist(list, seqs) {
  let pos = 0
  let skip = 0

  for (let s of seqs) {
    let l = []
    for (let i=0; i < s; ++i) {
      l[i] = list[(pos+i) % list.length]
    }
    for (let i=0; i < s; ++i) {
      list[(pos+i) % list.length] = l[s-1-i]
    }
    pos += s + skip++
  }

  return list[0] * list[1]
}

twist(list(5), [3,4,1,5]) //: 12

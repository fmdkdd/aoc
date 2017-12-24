function insert(x, arr, idx) {
  let ret = arr.slice(0, idx)
  ret.push(x)
  for (let i=idx; i < arr.length; ++i) {
    ret.push(arr[i])
  }
  return ret
}

insert(3, [0,1,2,4,5], 3) //: [0,1,2,3,4,5]
insert(3, [], 0) //: [3]
insert(3, [1], 0) //: [3,1]
insert(3, [1], 1) //: [1,3]

function perms(a) {
  if (a.length === 1) {
    return [a]
  }

  let [h, ...r] = a
  let sub = perms(r)
  let ret = []
  for (let i=0; i <= r.length; ++i) {
    sub.forEach(s => ret.push(insert(h, s, i)))
  }
  return ret
}

perms([1,2,3]) //: [[1,2,3],[1,3,2],[2,1,3],[3,1,2],[2,3,1],[3,2,1]]

function prefix(a) {
  let ret = []
  for (let i=1; i <= a.length; ++i) {
    ret.push(a.slice(0, i))
  }
  return ret
}

prefix([0,1,2,3]) //: [[0],[0,1],[0,1,2],[0,1,2,3]]

function valid(p) {
  let port = 0
  for (let i=0; i < p.length; ++i) {
    let [a,b] = p[i]
    if (a === port) {
      port = b
    } else if (b === port) {
      port = a
    } else {
      return false
    }
  }
  return true
}

valid([[0,2]]) //: true
valid([[0,2],[3,2]]) //: true
valid([[0,1],[10,1],[9,10]]) //: true

function solve(input) {
  let cmps = input.split('\n').map(l => l.split('/').map(c => parseInt(c, 10)))

  let candidates = []
  let seen = new Set()
  perms(cmps).forEach(p => prefix(p).forEach(pr => {
    let key = pr.map(s => s.join('/')).join('--')
    if (!seen.has(key)) {
      candidates.push(pr)
      seen.add(key)
    }
  }))
  console.log('Done enumerating')
  let bridges = candidates.filter(valid)
  console.log('Valid bridges: ', bridges.length)
  return Math.max.apply(null, bridges.map(b => b.reduce((sum, [a,b]) => sum + a + b, 0)))
}

console.log(solve(`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`))
//: 31

// Run out of memory on the actual puzzle input.
// Should have gone with Haskell for the lazyness!

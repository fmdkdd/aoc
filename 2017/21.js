function rotate(p) {
  // Exchange lines and columns
  // 01 -> 20
  // 23 -> 31
  let s = p.length === 4 ? [2,0,3,1]
  // 012    630
  // 345 -> 741
  // 678    852
    : [6,3,0,7,4,1,8,5,2]
  let out = []
  for (let i=0; i < p.length; ++i) {
    out.push(p[s[i]])
  }
  return out.join('')
}

rotate('#...') //: ".#.."
rotate(rotate('#...')) //: "...#"
rotate('#.#......') //: "..#.....#"

function flip(p) {
  // Exchange first and last columns
  let s = p.length === 4 ? [[0, 1], [2, 3]] : [[0, 2], [3, 5], [6, 8]]
  let out = p.split('')
  s.forEach(([a, b]) => {
    let t = out[a]
    out[a] = out[b]
    out[b] = t
  })
  return out.join('')
}

flip('#.#.') //: ".#.#"
flip('#........') //: "..#......"

function solve(input, iter) {
  let pat = new Map()
  input.split('\n').forEach(l => {
    let [p, t] = l.replace(/\//g, '').split(' => ')
    pat.set(p, t)
    pat.set(flip(p), t)
    ;[1,2,3].forEach(_ => {
      p = rotate(p)
      pat.set(p, t)
      pat.set(flip(p), t)
    })
  })

  const start = '.#...####'
  let p = start

  for (let i=0; i < iter; ++i) {
    let side = Math.floor(Math.sqrt(p.length))
    let squares = []

    // Split into 2x2 or 3x3 squares
    if (p.length % 2 === 0) {
      for (let y=0; y < side; y+=2) {
        for (let x=0; x < side; x+=2) {
          let xy = y * side + x
          squares.push([p[xy], p[xy+1], p[xy+side], p[xy+side+1]].join(''))
        }
      }
    } else {
      for (let y=0; y < side; y+=3) {
        for (let x=0; x < side; x+=3) {
          let xy = y * side + x
          squares.push([p[xy], p[xy+1], p[xy+2],
                        p[xy+side], p[xy+side+1], p[xy+side+2],
                        p[xy+side+side], p[xy+side+side+1], p[xy+side+side+2]].join(''))
        }
      }
    }

    // Transform each square
    let tr = squares.map(s => pat.get(s))

    // Assemble result
    let out = []
    let tr_n = Math.floor(Math.sqrt(tr.length))
    let tr_side = Math.floor(Math.sqrt(tr[0].length))
    for (let l=0; l < tr_n; ++l) {
      for (let c=0; c < tr_n; ++c) {
        let lc = l * tr_n + c
        // Go through each output square, and compute the
        // right coordinate (i) in the final assembled square
        for (let y=0; y < tr_side; ++y) {
          for (let x=0; x < tr_side; ++x) {
            let yx = y * tr_side + x
            // Trust me, it works out
            let i = x
            i += y * tr_side * tr_n
            i += c * tr_side
            i += l * tr_side * tr_side * tr_n
            out[i] = tr[lc][yx]
          }
        }
      }
    }
    p = out.join('')
  }

  return p.split('').filter(c => c === '#').length
}

solve(`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`, 2) //: 12

// 21b takes ~12sec

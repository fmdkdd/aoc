let re = /([a-z-]+)-([0-9]+)\[([a-z]+)\]/

re.exec(`aaaaa-bbb-z-y-x-123[abxyz]`) //: ["aaaaa-bbb-z-y-x-123[abxyz]","aaaaa-bbb-z-y-x","123","abxyz"]

function prep(line) {
  let m = re.exec(line)
  return {
    room: m[1].replace(/-/g, ''),
    id: parseInt(m[2], 10),
    sum: m[3]
  }
}

function common(s) {
  let letters = new Map()
  s.split('').forEach(l => {
    if (!letters.has(l)) {
      letters.set(l, 0)
    }
    letters.set(l, letters.get(l) + 1)
  })

  let a = Array.from(letters)
  a.sort(([ak,av], [bk,bv]) => {
        if (av > bv) return -1
   else if (av < bv) return 1
   if (ak < bk) return -1
   else if (ak > bk) return 1
   return 0
  })

  return a.map(([k,_]) => k).slice(0,5)
}

common("aaaaabbbzyx") //: ["a","b","x","y","z"]
common("notarealroom") //: ["o","a","r","e","l"]

function solve(input) {
  let answer = 0
  input.split('\n').forEach(l => {
    let p = prep(l)
    if (common(p.room).join('') === p.sum) {
      answer += p.id
    }
  })

  return answer
}

let input0 = `aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]`

solve(input0) //: 1514

function common(s) {
  let letters = new Map()
  s.forEach(l => {
    if (!letters.has(l)) {
      letters.set(l, 0)
    }
    letters.set(l, letters.get(l) + 1)
  })

  let a = Array.from(letters)
  a.sort(([ak,av], [bk,bv]) => {
        if (av < bv) return -1
   else if (av > bv) return 1
   if (ak < bk) return -1
   else if (ak > bk) return 1
   return 0
  })

  return a.map(([k,_]) => k)[0]
}

function solve(input) {
  let lines = input.split('\n').map(l => l.split(''))
  let msg = ''
  for (let i=0; i < lines[0].length; ++i) {
    msg += common(lines.map(l => l[i]))
  }

  return msg;
}

let input0 = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`

solve(input0) //: "advent"

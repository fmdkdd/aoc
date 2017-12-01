let re = /^\(([0-9]+)x([0-9]+)\)/

re.exec("A(1x5)B") //: null
re.exec("(99x2)BB") //: ["(99x2)","99","2"]

function deflate(s) {
  let len = 0
  for (let i=0; i < s.length; ++i) {
    let ss = s.substr(i)
    let m = re.exec(ss)
    if (m) {
      let c = parseInt(m[1], 10)
      let r = parseInt(m[2], 10)

      let ch = deflate(ss.substr(m[0].length, c))
      i += m[0].length + c - 1

      len += ch * r
    } else {
      len++
    }
  }

  return len
}

deflate('ADVENT') //: 6
deflate('A(1x5)BC') //: 7
deflate('(3x3)XYZ') //: 9
deflate('A(2x2)BCD(2x2)EFG') //: 11
deflate('(6x1)(1x3)A') //: 3
deflate('X(8x2)(3x3)ABCY') //: 20
deflate('(27x12)(20x12)(13x14)(7x10)(1x12)A') //: 241920
deflate('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN') //: 445

function solve(input) {
  return deflate(input.replace(/\s/g, ''))
}

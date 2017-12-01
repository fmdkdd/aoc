let re = /^\(([0-9]+)x([0-9]+)\)/

re.exec("A(1x5)B") //: null
re.exec("(99x2)BB") //: ["(99x2)","99","2"]

function deflate(s) {
  let out = ''
  for (let i=0; i < s.length; ++i) {
    let ss = s.substr(i)
    let m = re.exec(ss)
    if (m) {
      let c = parseInt(m[1], 10)
      let r = parseInt(m[2], 10)

      i += m[0].length + c - 1
      let ch = ss.substr(m[0].length, c)

      while (r > 0) {
        out += ch
        r--;
      }
    } else {
      out += ss[0]
    }
  }

  return out
}

deflate('ADVENT') //: "ADVENT"
deflate('A(1x5)BC') //: "ABBBBBC"
deflate('(3x3)XYZ') //: "XYZXYZXYZ"
deflate('A(2x2)BCD(2x2)EFG') //: "ABCBCDEFEFG"
deflate('(6x1)(1x3)A') //: "(1x3)A"
deflate('X(8x2)(3x3)ABCY') //: "X(3x3)ABC(3x3)ABCY"

function solve(input) {
  return deflate(input.replace(/\s/g, ''))
}


function prep(line) {
  let seq = []
  let hyp = []
  let cur = ''
  let in_hyper = false
  for (let i=0; i < line.length; ++i) {
    if (line[i] === '[' && !in_hyper) {
      seq.push(cur)
      in_hyper = true
      cur = ''
      continue
    } else if (line[i] === ']' && in_hyper) {
      hyp.push(cur)
      in_hyper = false
      cur = ''
      continue
    }

    cur += line[i]
  }

  seq.push(cur)

  return {seq, hyp}
}

prep("abba[mnop]qrst") //: Object {seq:["abba","qrst"],hyp:["mnop"]}

function aba1(s) {
  return s[0] !== s[1] && s[0] === s[2]
}

aba1("aba") //: true
aba1("xog") //: false
aba1("xxy") //: false
aba1("aaa") //: false

function aba(s) {
  let abas = []
  for (let i=0; i < s.length - 2; ++i) {
    let sub = s.substr(i, 3)
    if (aba1(sub)) {
      abas.push(sub)
    }
  }
  return abas
}

aba("zazbz") //: ["zaz","zbz"]

function ssl(ip) {
  let abas = ip.seq.map(aba).reduce((ll, l) => ll.concat(l), [])
  let babas = ip.hyp.map(aba).reduce((ll, l) => ll.concat(l), [])
    .filter(bab => abas.some(aba => aba[0] === bab[1] && aba[1] === bab[0]))
  return babas.length > 0
}

function solve(input) {
  let count = 0
  input.split('\n').forEach(l => {
    if (ssl(prep(l))) {
      count++
    }
  })

  return count
}

let input0 = `aba[bab]xyz
xyx[xyx]xyx
aaa[kek]eke
zazbz[bzb]cdb[aaa]zazbz
`

solve(input0) //: 3

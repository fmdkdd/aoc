
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

function abba1(s) {
  return s[0] !== s[1] && s[0] === s[3] && s[1] === s[2]
}

abba1("abba") //: true
abba1("xorg") //: false
abba1("xxyy") //: false
abba1("aaaa") //: false

function abba(s) {
  for (let i=0; i < s.length - 3; ++i) {
    if (abba1(s.substr(i, 4))) {
      return true
    }
  }
  return false
}

function tls(ip) {
  return ip.seq.some(abba) && !ip.hyp.some(abba)
}

function solve(input) {
  let count = 0
  input.split('\n').forEach(l => {
    if (tls(prep(l))) {
      count++
    }
  })

  return count
}

let input0 = `abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn
`

solve(input0) //: 2

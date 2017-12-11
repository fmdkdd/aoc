function parse(line) {
  let state = 'group'
  let depth = 0
  let score = 0
  let garbage = 0

  for (let i=0; i < line.length; ++i) {
    let c = line[i]
    switch (state) {
      case 'group':
        switch (c) {
          case '<': state = 'garbage'; break
          case '{': depth++; break
          case '}': score += depth--; break
          case ',': break
          default: throw 'Unexpected char in group ' + c
        }
        break

      case 'garbage':
        switch(c) {
          case '!': i++; break
          case '>': state = 'group'; break
          default: garbage++
        }
        break

        default: throw 'Bad state ' + state
    }
  }

  return [score, garbage]
}

parse('<random characters>') //: [0,17]
parse('<>') //: [0,0]
parse('{}') //: [1,0]
parse('{{{}}}') //: [6,0]
parse('{{},{}}') //: [5,0]
parse('{{{},{},{{}}}}') //: [16,0]
parse('{<a>,<a>,<a>,<a>}') //: [1,4]
parse('{{<ab>},{<ab>},{<ab>},{<ab>}}') //: [9,8]
parse('{{<!!>},{<!!>},{<!!>},{<!!>}}') //: [9,0]
parse('{{<a!>},{<a!>},{<a!>},{<ab>}}') //: [3,17]

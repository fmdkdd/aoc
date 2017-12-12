const re = /([0-9]+) <-> ([0-9]+(?:, [0-9]+)*)/

function parse(line) {
  let m = re.exec(line)

  if (m) {
    return {
      a: parseInt(m[1], 10),
      neighbors: m[2].split(',').map(d => parseInt(d, 10))
    }
  } else {
    throw 'Non-matching line: ' + line
  }
}

parse('4 <-> 2, 3, 6') //: Object {a:4,neighbors:[2,3,6]}
parse('0 <-> 2') //: Object {a:0,neighbors:[2]}

function solve(input) {
  let g = input.split('\n').map(parse)

  let group = new Set()
  let queue = [g[0]]
  while (queue.length > 0) {
    let c = queue.pop()
    group.add(c.a)
    c.neighbors.forEach(n => {
      if (!group.has(n)) {
        queue.push(g[n])
      }
    })
  }

  return group.size
}

let input0 = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`

solve(input0) //: 6

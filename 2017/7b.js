let re = /([a-z]+) \(([0-9]+)\)(?: -> ([a-z, ]+))?/

re.exec("fwft (72) -> ktlj, cntj, xhth")
//: ["fwft (72) -> ktlj, cntj, xhth","fwft","72","ktlj, cntj, xhth"]

function parse(line) {
  let m = re.exec(line)

  return {
    name: m[1],
    weight: parseInt(m[2], 10),
    childs: m[3] ? m[3].split(',').map(s => s.trim()) : [],
  }
}

parse("fwft (72) -> ktlj, cntj, xhth") //: Object {name:"fwft",weight:72,childs:["ktlj","cntj","xhth"]}
parse("pgba (66)") //: Object {name:"pgba",weight:66,childs:[]}

function weight(n, map) {
  return n.weight + n.childs.map(c => weight(map.get(c), map)).reduce((sum, v) => sum + v, 0)
}

function unbalanced(n, map, delta = 0) {
  let c = n.childs.map(c => [c, weight(map.get(c), map)])
  if (c.every(n => n[1] === c[0][1])) {
    return n.weight - delta
  } else {
    let max = c.reduce((max, n) => n[1] > max[1] ? n : max)
    let min = c.reduce((min, n) => n[1] < min[1] ? n : min)

    return unbalanced(map.get(max[0]), map, max[1] - min[1])
  }
}

function solve(input) {
  let t = input.split('\n').map(parse)
  let root =  t.find(n => t.every(m => !m.childs.includes(n.name)))

  let m = new Map();
  t.forEach(t => m.set(t.name, t))
  return unbalanced(root, m)
}

let input0 = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`

solve(input0) //: 60

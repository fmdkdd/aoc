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

function solve(input) {
  let t = input.split('\n').map(parse)
  return t.find(n => t.every(m => !m.childs.includes(n.name)))
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

solve(input0) //: Object {name:"tknk",weight:41,childs:["ugml","padx","fwft"]}

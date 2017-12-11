let re = /([a-z]+) (inc|dec) (-?[0-9]+) if ([a-z]+) (>|<|>=|<=|==|!=) (-?[0-9]+)/

re.exec("b inc 5 if a > 1") //: ["b inc 5 if a > 1","b","inc","5","a",">","1"]
re.exec("a inc 1 if b < 5") //: ["a inc 1 if b < 5","a","inc","1","b","<","5"]
re.exec("c dec -10 if a >= 1") //: ["c dec -10 if a >= 1","c","dec","-10","a",">=","1"]
re.exec("c inc -20 if c == 10") //: ["c inc -20 if c == 10","c","inc","-20","c","==","10"]

function parse(line) {
  let m = re.exec(line)

  return {
    r1: m[1],
    d: m[2] === 'inc' ? parseInt(m[3], 10) : -parseInt(m[3], 10),
    r2: m[4],
    cond: m[5],
    r3: m[6],
  }
}

parse("b inc 5 if a > 1") //: Object {r1:"b",d:5,r2:"a",cond:">",r3:"1"}
parse("c dec -20 if c == 10") //: Object {r1:"c",d:20,r2:"c",cond:"==",r3:"10"}

let regs = new Map()
let max = Number.NEGATIVE_INFINITY

function get(r) {
  if (!regs.has(r)) {
    regs.set(r, 0)
  }
  return regs.get(r)
}

function set(r, n) {
  if (!regs.has(r)) {
    regs.set(r, 0)
  }
  regs.set(r, n)
  max = Math.max(max, n)
}

function ex(line) {
  if (eval(get(line.r2) + "" + line.cond + line.r3)) {
    set(line.r1, get(line.r1) + line.d)
  }
}

function solve(input) {
  regs = new Map()
  max = Number.NEGATIVE_INFINITY
  input.split('\n').map(parse).forEach(ex)

  return max
}

let input0 = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`

solve(input0) //: 10

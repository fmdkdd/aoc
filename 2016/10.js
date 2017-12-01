let bots = []
let outputs = []

function bot(low, high) {
  let v = []

  return {
    push(n) {
      v.push(n)

      if (v.length === 2) {
        if (v[0] < v[1]) {
          low[0] === 'bot' ? bots[low[1]].push(v[0]) : outputs[low[1]] = v[0]
          high[0] === 'bot' ? bots[high[1]].push(v[1]) : outputs[high[1]] = v[1]
        } else {
          low[0] === 'bot' ? bots[low[1]].push(v[1]) : outputs[low[1]] = v[1]
          high[0] === 'bot' ? bots[high[1]].push(v[0]) : outputs[high[1]] = v[0]
        }

        if ((v[0] === 17 && v[1] === 61)
           || v[0] === 61 && v[1] === 17) {
          console.log(low, high)
        }
      }
    }
  }
}

let b0 = bot(['out', 2], ['out', 0])
let b1 = bot(['out', 1], ['bot', 0])
let b2 = bot(['bot', 1], ['bot', 0])

bots = [b0, b1, b2]

b2.push(5)
b1.push(3)
b2.push(2)

bots //: [Object {push:function push},Object {push:function push},Object {push:function push}]
outputs //: [5,2,3]

let re_val = /^value ([0-9]+) goes to bot ([0-9]+)$/
let re_giv = /^bot ([0-9]+) gives low to (bot|output) ([0-9]+) and high to (bot|output) ([0-9]+)$/

let VAL = {}
let GIV = {}

function parse(l) {
  let m
  if ((m = re_val.exec(l))) {
    return function() {
      bots[parseInt(m[2], 10)].push(parseInt(m[1], 10))
    }
  }
  else if ((m = re_giv.exec(l))) {
    bots[parseInt(m[1], 10)] = bot([m[2], parseInt(m[3], 10)], [m[4], parseInt(m[5], 10)])
    return function() {}
  }
  else {
    throw 'Unhandled line: ' + l
  }
}

function solve(input) {
  input.split('\n').map(parse).forEach(p => { p() })
}

let input0 = `value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`

bots = []
outputs = []
solve(input0) //: undefined

bots.length //: 3
outputs //: [5,2,3]

function solve(input) {
  let cmps = input.split('\n').map(l => l.split('/').map(c => parseInt(c, 10)))

  let states = [[0, cmps, []]]
  let bridges = []
  let seen = new Set()

  while (states.length > 0) {
    let [port, cmps, bridge] = states.pop()
    for (let i=0; i < cmps.length; ++i) {
      let [a,b] = cmps[i]
      let rst = cmps.slice(0, i).concat(cmps.slice(i+1))
      if (a === port) {
        states.push([b, rst, bridge.concat([[a,b]])])
      } else if (b === port) {
        states.push([a, rst, bridge.concat([[a,b]])])
      } else {
        if (bridge.length > 0) {
          let key = bridge.map(s => s.join('/')).join('--')
          if (!seen.has(key)) {
            bridges.push(bridge)
            seen.add(key)
          }
        }
      }
    }
  }

  //return bridges.length
  let strengths = bridges.map(b => [b.length, b.reduce((sum, [a,b]) => sum + a + b, 0)])
  let max_length = 0
  for (let [l, s] of strengths) {
    if (l > max_length) {
      max_length = l
    }
  }
  let longest = strengths.filter(([l, s]) => l === max_length)
  let max_strength = 0
  for (let [l, s] of longest) {
    if (s > max_strength) {
      max_strength = s
    }
  }
  return max_strength
}

console.log(solve(`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`))
//: 31

// Runs in 1min22 on the actual input

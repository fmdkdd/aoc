function solve(input) {
  let cmps = input.split('\n').map(l => l.split('/').map(c => parseInt(c, 10)))

  let states = [[0, cmps, 0, 0]]
  let len_str = []

  while (states.length > 0) {
    let [port, cmps, str, len] = states.pop()
    for (let i=0; i < cmps.length; ++i) {
      let [a,b] = cmps[i]
      let rst = cmps.slice(0, i).concat(cmps.slice(i+1))
      if (a === port) {
        states.push([b, rst, str + a + b, len + 1])
      } else if (b === port) {
        states.push([a, rst, str + a + b, len + 1])
      } else if (len > 0) {
        len_str.push([len, str])
      }
    }
  }

  let max_length = 0
  for (let [l, s] of len_str) {
    if (l > max_length) {
      max_length = l
    }
  }
  let longest = len_str.filter(([l, s]) => l === max_length)
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
//: 19

// Runs in 18s on the actual input

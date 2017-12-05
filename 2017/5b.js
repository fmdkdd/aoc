function solve(input) {
  let instrs = input.split('\n').map(l => parseInt(l, 10))

  let steps = 0
  let pc = 0
  do {
    pc += instrs[pc] >= 3 ? instrs[pc]-- : instrs[pc]++
    steps++
  } while (pc >= 0 && pc < instrs.length)

  return steps
}

solve(`0
3
0
1
-3`) //: 10

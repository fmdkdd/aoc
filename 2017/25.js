let states0 = {
    A: [[1, 'R', 'B'],
        [0, 'L', 'B']],

    B: [[1, 'L', 'A'],
        [1, 'R', 'A']],
}

// Guuhh.  Not parsing the input automatically for this one.
// Faster to just build the machine by hand.
let states1 = {
    A: [[1, 'R', 'B'],
        [0, 'L', 'C']],

    B: [[1, 'L', 'A'],
        [1, 'R', 'D']],

    C: [[1, 'R', 'A'],
        [0, 'L', 'E']],

    D: [[1, 'R', 'A'],
        [0, 'R', 'B']],

    E: [[1, 'L', 'F'],
        [1, 'L', 'C']],

    F: [[1, 'R', 'D'],
        [1, 'R', 'A']],
}

function solve(states, start, iter) {
  let state = start
  let tape = []
  let cursor = 0
  let min_cursor = 0

   while (iter > 0) {
     let s = tape[cursor] === 1 ? states[state][1] : states[state][0]
     tape[cursor] = s[0]
     cursor += s[1] === 'L' ? -1 : +1
     min_cursor = Math.min(cursor, min_cursor)
     state = s[2]
     iter--
   }

  let sum = 0
  for (let i=min_cursor; i < tape.length; ++i) {
    if (tape[i] === 1) {
      sum++
    }
  }
  return sum
}

solve(states0, 'A', 6) //: 3

// 2 seconds for the actual input
console.log(solve(states1, 'A', 12173597)) //:⌛ (timeout)

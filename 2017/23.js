function solve(input) {
  let r = {a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0}
  let pc = 0
  let answer = 0

  function val(x) {
    let n = parseInt(x, 10)
    if (Number.isNaN(n)) {
      return r[x]
    } else {
      return n
    }
  }

  let ops = {
    set(x, y) {
      r[x] = val(y)
    },
    sub(x, y) {
      r[x] -= val(y)
    },
    mul(x, y) {
      r[x] *= val(y)
      answer++
    },
    jnz(x, y) {
      if (val(x) !== 0) {
        pc--
        pc += val(y)
      }
    }
  }

  let prog = input.split('\n').map(l => l.trim().split(' '))

  while (pc >= 0 && pc < prog.length) {
    let [cmd, ...args] = prog[pc++]
    //console.log(pc, cmd, args)
    ops[cmd].apply(null, args)
    //console.log(r)
  }

  return answer
}

solve(`set b 79
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`)
//: 5929

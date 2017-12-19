function solve(input) {
  let r = {a: 0}
  let freq = 0
  let pc = 0
  let exit = false

  function val(x) {
    let n = parseInt(x, 10)
    if (Number.isNaN(n)) {
      return r[x]
    } else {
      return n
    }
  }

  let ops = {
    snd(x) {
      freq = val(x)
    },
    set(x, y) {
      r[x] = val(y)
    },
    add(x, y) {
      r[x] += val(y)
    },
    mul(x, y) {
      r[x] *= val(y)
    },
    mod(x, y) {
      r[x] %= val(y)
    },
    rcv(x) {
      if (val(x) !== 0) {
        console.log(freq)
        exit = true
      }
    },
    jgz(x, y) {
      if (val(x) > 0) {
        pc--
        pc += val(y)
      }
    }
  }

  let prog = input.split('\n').map(l => l.trim().split(' '))

  while (!exit && pc >= 0 && pc < prog.length) {
    let [cmd, ...args] = prog[pc++]
    //console.log(pc, cmd, args)
    ops[cmd].apply(null, args)
    //console.log(r)
  }

  return r
}

solve(`set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`)

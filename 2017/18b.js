let queues = [[], []]

function mk(p) {
  let r = {p}
  let pc = 0
  let exit = false
  let send = 0

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
      queues[1-p].unshift(val(x))
      if (p === 1) {
        console.log(++send)
      }
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
      if (queues[p].length > 0) {
        r[x] = queues[p].pop()
      } else {
        pc--
      }
    },
    jgz(x, y) {
      if (val(x) > 0) {
        pc--
        pc += val(y)
      }
    }
  }

  return {
    run(prog) {
      let [cmd, ...args] = prog[pc++]
      // console.log(pc, cmd, args)
      ops[cmd].apply(null, args)
      // console.log(r)
      return (pc >= 0 && pc < prog.length)
    },

    pc() {
      return pc
    },
  }
}

function solve(input) {
  let prog = input.split('\n').map(l => l.trim().split(' '))

  let p1 = mk(0)
  let p2 = mk(1)

  let a = false
  let b = false
  do {
    a = p1.run(prog)
    b = p2.run(prog)
    if (prog[p1.pc()][0] === 'rcv' && queues[0].length === 0
        && prog[p2.pc()][0] === 'rcv' && queues[1].length === 0) {
      break
    }
  } while (a && b)

}

solve(`snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`)

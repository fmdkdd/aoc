let re = /p=<([0-9-,]+)>, v=<([0-9-,]+)>, a=<([0-9-,]+)>/

let p = {
  new(pos, vel, acc) {
    return {__proto__: this,
        pos, vel, acc,
        dead: false
     }
  },

  update() {
    this.vel[0] += this.acc[0]
    this.vel[1] += this.acc[1]
    this.vel[2] += this.acc[2]
    this.pos[0] += this.vel[0]
    this.pos[1] += this.vel[1]
    this.pos[2] += this.vel[2]
  },

  dist() {
    return Math.abs(this.pos[0]) + Math.abs(this.pos[1]) + Math.abs(this.pos[2])
  },

}

function solve(input) {
  let ps = input.split('\n').map(l => {
    let m = re.exec(l)

    return p.new(m[1].split(',').map(d => parseInt(d, 10)),
                 m[2].split(',').map(d => parseInt(d, 10)),
                 m[3].split(',').map(d => parseInt(d, 10))
                )
  })

  // Got lucky again only running the simulation 1000 steps.
  // The right way would be to run until there can be no more
  // collisions.  That is, check that all particles are sorted
  // by increasing acceleration, of either side of the origin.
  for (let i=0; i < 1000; ++i) {
    let poss = new Map()
    for (let x=0; x < ps.length; ++x) {
      if (!ps[x].dead) {
        ps[x].update()
        let pos = ps[x].pos.toString()
        if (!poss.has(pos)) {
          poss.set(pos, [x])
        } else {
          poss.get(pos).push(x)
        }
      }
    }

    for (let [_, idx] of poss) {
      if (idx.length > 1) {
        idx.forEach(i => {
          ps[i].dead = true
        })
      }
    }
  }

  return ps.filter(v => !v.dead).length
}

re.exec(`p=<-1027,-979,-188>, v=<7,60,66>, a=<9,1,-7>`)
//: ["p=<-1027,-979,-188>, v=<7,60,66>, a=<9,1,-7>","-1027,-979,-188","7,60,66","9,1,-7"]

solve(`p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>
p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>`)
//: 1

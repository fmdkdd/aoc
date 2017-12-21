let re = /p=<([0-9-,]+)>, v=<([0-9-,]+)>, a=<([0-9-,]+)>/

let p = {
  new(pos, vel, acc) {
    return {__proto__: this,
        pos, vel, acc,
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

  // Bit of hack.. maybe just looking at the acceleration is
  // enough to determine which stays closest to origin?  Assuming
  // all particles have non-zero acceleration.
  for (let i=0; i < 1000; ++i) {
    for (let p0 of ps) {
      p0.update()
    }
  }

  return ps.map(v => v.dist())
    .reduce(([min,idx], v, i) => v < min ? [v, i] : [min, idx], [Number.POSITIVE_INFINITY, -1])
}

re.exec(`p=<-1027,-979,-188>, v=<7,60,66>, a=<9,1,-7>`)
//: ["p=<-1027,-979,-188>, v=<7,60,66>, a=<9,1,-7>","-1027,-979,-188","7,60,66","9,1,-7"]

solve(`p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>`)
//: [498497,0]

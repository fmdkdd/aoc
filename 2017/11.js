// See https://www.redblobgames.com/grids/hexagons/

let dirs_map = {
  n:  [ 0, +1, -1],
  ne: [+1,  0, -1],
  se: [+1, -1,  0],
  s:  [ 0, -1, +1],
  sw: [-1,  0, +1],
  nw: [-1, +1,  0],
}

function move(coord, dir) {
  let c = dirs_map[dir]
  return [coord[0] + c[0],
          coord[1] + c[1],
          coord[2] + c[2]]
}

function dist(coord) {
  return (Math.abs(coord[0]) + Math.abs(coord[1]) + Math.abs(coord[2])) / 2
}

function solve(input) {
  let pos = [0,0,0]
  let max = 0
  input.split(',').forEach(d => {
    pos = move(pos, d)
    max = Math.max(max, dist(pos))
  })

  return [dist(pos), max]
}

solve('ne,ne,ne') //: [3,3]
solve('ne,ne,s,s') //: [2,2]
solve('se,sw,se,sw,sw') //: [3,3]

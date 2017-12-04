let input0 = `aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`

function valid(l) {
  let a = l.replace(/\s/g, ' ').split(' ')
  for (let i=0; i < a.length; ++i) {
    for (let j=i+1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        return false
      }
    }
  }
  return true
}

function solve(input) {
  return input.split('\n').filter(valid).length
}

solve(input0) //: 2

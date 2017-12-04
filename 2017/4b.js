let input0 = `abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`

function anagram(a, b) {
  if (a.length !== b.length) {
    return false
  }

  let aa = a.split('')
  let bb = b.split('')
  aa.sort()
  bb.sort()

  for (let i=0; i < aa.length; ++i) {
    if (aa[i] !== bb[i]) {
      return false
    }
  }

  return true
}

function valid(l) {
  let a = l.replace(/\s/g, ' ').split(' ')
  for (let i=0; i < a.length; ++i) {
    for (let j=i+1; j < a.length; ++j) {
      if (anagram(a[i], a[j])) {
        return false
      }
    }
  }
  return true
}

function solve(input) {
  return input.split('\n').filter(valid).length
}

solve(input0) //: 3

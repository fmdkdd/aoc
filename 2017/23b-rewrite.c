#include <math.h>
#include <stdio.h>
#include <stdbool.h>

struct rr {
  int a,b,c,d,e,f,g,h;
};

int main() {
  int h = 0;
  int b = 107900;

  // After a few rewrites, it turns out the original program tests all numbers
  // from 107900 to 124900 (include) with step of 17 and counts the non-primes,
  // very inefficiently.  It used a double inner loop to enumerate all couples
  // (d,e) to find if when multiplied they gave b.  It also kept enumerating the
  // couples even when it was clear b was a non-prime.

  // Instead of enumerating all couples (d,e) < b, a faster way is to check for
  // divisibility by the numbers in [2,sqrt(b)].  Only one inner loop, that
  // grows in sqrt(b), and one modulo instead of multiplication.  Instantaneous
  // answer.
  for (int i=0; i <= 1000; ++i) {
    int s = sqrt(b) + 1;
    for (int d=2; d < s; ++d) {
      if (b % d == 0) {
        h += 1;
        break;
      }
    }
    b += 17;
  }

  printf("%d\n", h);

  return 0;
}

// Have to figure out what the program is doing.
// Rewriting it in C, just in case it still needs to
// run fast after that.

#include <stdio.h>

struct rr {
  int a,b,c,d,e,f,g,h;
};

int main() {

  struct rr r = {a: 1, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0};

  r.b = 79;
  r.c = r.b;
  if (r.a != 0) {
    r.b *= 100;      // 7900
    r.b += 100000;   // 107900
    r.c = r.b;       // 107900
    r.c += 17000;    // 124900
  }
  do {
    r.f = 1;
    r.d = 2;
    do {
      r.e = 2;
      do {
        r.g = r.d * r.e - r.b;
        if (r.g == 0) {
          r.f = 0;
        }
        r.e += 1;
        r.g = r.e - r.b;
      } while (r.g != 0);
      r.d += 1;
      r.g = r.d - r.b;
    } while (r.g != 0);
    if (r.f == 0) {
      r.h += 1;
    }
    r.g = r.b - r.c;
    if (r.g == 0) {
      break;
    }
    r.b += 17;
  } while (r.g != 0);

  printf("%d\n", r.h);

  // This is more or less a direct translation of the assembly.
  // Unfortunately, crunching that through -O3 does not seem to
  // yield sufficient speed up.
  // Rewriting it some more in 23b-rewrite.c

  return 0;
}

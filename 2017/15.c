// JS is capable, but the default timeout of 1s in s3c is too low
#include <stdio.h>

struct Gen {
  int prev;
  int factor;
};

int next(struct Gen *g) {
  g->prev = ((long)g->prev * (long)g->factor) % 2147483647;
  return g->prev;
}

int main() {
  struct Gen A;
  A.prev = 65;
  A.factor = 16807;
  struct Gen B;
  B.prev = 8921;
  B.factor = 48271;

  int match = 0;
  for (int i=0; i < 40000000; ++i) {
    int a = next(&A);
    int b = next(&B);
    if ((a & 0xffff) == (b & 0xffff)) {
      match++;
    }
  }

  printf("%d\n", match);

  return 0;
}

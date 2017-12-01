#include <openssl/md5.h>
#include <stdio.h>
#include <string.h>

int main(int argc, char **argv) {
  char* input = argv[1];
  unsigned char hash[MD5_DIGEST_LENGTH];
  char temp[255];
  char password[9];

  unsigned int nonce = 0;
  for (int loops=0; loops < 8; ++loops) {
    int head = 0;
    do {
      sprintf(temp, "%s%d", input, nonce++);
      MD5((unsigned char*)temp, strlen(temp), hash);
      head = hash[0] | hash[1] | (hash[2] & 0xf0);
    } while (head != 0);

    sprintf(password + loops, "%x", hash[2] & 0x0f);
    printf("%d: %s -> %02x\n", loops, temp, hash[2] & 0x0f);
  }

  printf("password: %s\n", password);

  return 0;
}

/* Local Variables: */
/* compile-command: "gcc 5.c -O2 -lssl -lcrypto" */
/* End: */

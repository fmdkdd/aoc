#include <openssl/md5.h>
#include <stdio.h>
#include <string.h>

int main(int argc, char **argv) {
  char* input = argv[1];
  unsigned char hash[MD5_DIGEST_LENGTH];
  char temp[255];
  char password[9];
  memset(password, ' ', 8);
  password[8] = 0;
  char letter[3];
  memset(letter, 0, 3);

  unsigned int nonce = 0;
  for (int loops=0; loops < 8; ++loops) {
    int head = 0;
    int pos = 0;
    do {
      sprintf(temp, "%s%d", input, nonce++);
      MD5((unsigned char*)temp, strlen(temp), hash);
      head = hash[0] | hash[1] | (hash[2] & 0xf0);
      pos = hash[2] & 0x0f;
    } while (!(head == 0 && pos >= 0 && pos < 8 && password[pos] == ' '));

    sprintf(letter, "%02x", (hash[3] & 0xf0));
    password[pos] = letter[0];
    printf("%s\n", password);
    //printf("%d: %s -> %02x\n", pos, temp, hash[3]);
  }

  return 0;
}

/* Local Variables: */
/* compile-command: "gcc 5b.c -O2 -lssl -lcrypto" */
/* End: */

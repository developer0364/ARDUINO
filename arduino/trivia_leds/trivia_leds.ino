#include <DigiCDC.h>

const int VERDE_A = 0;
const int VERDE_B = 1;
const int ROJO    = 4;

void setup() {
  SerialUSB.begin();
  pinMode(VERDE_A, OUTPUT);
  pinMode(VERDE_B, OUTPUT);
  pinMode(ROJO,    OUTPUT);
  digitalWrite(VERDE_A, LOW);
  digitalWrite(VERDE_B, LOW);
  digitalWrite(ROJO,    LOW);
}

void loop() {
  SerialUSB.delay(10);
  if (SerialUSB.available()) {
    char cmd = SerialUSB.read();
    if (cmd == 'G') {
      digitalWrite(VERDE_A, HIGH);
      digitalWrite(VERDE_B, HIGH);
      SerialUSB.delay(2000);
      digitalWrite(VERDE_A, LOW);
      digitalWrite(VERDE_B, LOW);
    } else if (cmd == 'R') {
      digitalWrite(ROJO, HIGH);
      SerialUSB.delay(2000);
      digitalWrite(ROJO, LOW);
    }
  }
}

#include <DigiCDC.h>

const int VERDE = 0;
const int ROJO  = 4;

void setup() {
  SerialUSB.begin();
  pinMode(VERDE, OUTPUT);
  pinMode(ROJO,  OUTPUT);
  digitalWrite(VERDE, LOW);
  digitalWrite(ROJO,  LOW);
}

void loop() {
  SerialUSB.refresh();
  if (SerialUSB.available()) {
    int cmd = SerialUSB.read();
    if (cmd == 'G') {
      digitalWrite(VERDE, HIGH);
      SerialUSB.delay(4000);
      digitalWrite(VERDE, LOW);
    } else if (cmd == 'R') {
      digitalWrite(ROJO, HIGH);
      SerialUSB.delay(4000);
      digitalWrite(ROJO, LOW);
    }
  }
}

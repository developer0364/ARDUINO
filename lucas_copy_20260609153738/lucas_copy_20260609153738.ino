#include <DigiUSB.h>

const int VERDE = 0;
const int ROJO  = 4;

void setup() {
  DigiUSB.begin();
  pinMode(VERDE, OUTPUT);
  pinMode(ROJO,  OUTPUT);
  digitalWrite(VERDE, LOW);
  digitalWrite(ROJO,  LOW);
}

void loop() {
  DigiUSB.refresh();
  if (DigiUSB.available()) {
    int cmd = DigiUSB.read();
    if (cmd == 'G') {
      digitalWrite(VERDE, HIGH);
      DigiUSB.delay(4000);
      digitalWrite(VERDE, LOW);
    } else if (cmd == 'R') {
      digitalWrite(ROJO, HIGH);
      DigiUSB.delay(4000);
      digitalWrite(ROJO, LOW);
    }
  }
}                                                                                                                    
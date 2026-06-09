1. **Instalación de Node.js:**
   * Descarga e instala la versión recomendada desde el sitio oficial de Node.js.
 2. **Verificación de Versión:**
   * Abre **PowerShell** y ejecuta el siguiente comando para confirmar que se instaló correctamente:
     node -v
   * *Resultado esperado:* Debería devolver la versión (ej. v18.0.0 o superior).
 3. **Instalación de Dependencias:**
   * Abre una terminal (**CMD**) en la carpeta raíz del proyecto y ejecuta:
     npm install
   * *Resultado esperado:* El mensaje added packages indicará que las librerías se instalaron con éxito.
 4. **Ejecución del Proyecto:**
   * En la terminal de tu editor de código (o CMD), ejecuta:
     npm run dev
   * *Resultado esperado:* Se generará un enlace local (ej. http://localhost:5173) para abrir el juego en el navegador.
## Integración con Arduino (ATtiny85 Digispark)

La app puede conectarse opcionalmente a un ATtiny85 Digispark vía USB para encender LEDs físicos según la respuesta del jugador.

### Hardware necesario
* Placa ATtiny85 Digispark (con USB incorporado)
* 2 LEDs verdes conectados a los pines **0** y **1**
* 1 LED rojo conectado al pin **4**
* Resistencias de 220Ω para cada LED
* Protoboard y cables

> **Nota:** El pin 3 del Digispark está reservado para USB (D−) y **no puede usarse** para LEDs.

### Configuración de Arduino IDE

1. Abrir Arduino IDE → `Archivo > Preferencias`
2. En *URLs adicionales de gestor de tarjetas*, agregar:
   ```
   http://digistump.com/package_digistump_index.json
   ```
3. Ir a `Herramientas > Placa > Gestor de tarjetas` → buscar **Digistump AVR Boards** → instalar
4. Seleccionar placa: `Herramientas > Placa > Digispark (Default - 16.5mhz)`

### Cargar el sketch

1. Abrir `arduino/trivia_leds/trivia_leds.ino` en Arduino IDE
2. Hacer clic en **Subir** (no conectar el Digispark todavía)
3. Cuando Arduino IDE muestre `Plug in device now...`, conectar el Digispark por USB
4. Esperar hasta que el IDE confirme la carga

### Comportamiento esperado con Arduino

* **Botón `⚪ ARDUINO`** aparece en la esquina inferior derecha de la pantalla de juego
* Al hacer clic, Chrome muestra un popup para seleccionar el puerto COM del Digispark
* Tras conectar, el botón cambia a `🟢 ARDUINO`
* **Respuesta correcta:** LEDs verdes (pines 0 y 1) encienden durante 2 segundos
* **Respuesta incorrecta:** LED rojo (pin 4) enciende durante 2 segundos
* Si no se conecta el Arduino, el juego funciona normalmente sin LEDs

> **Requisito del navegador:** Chrome o Edge en Windows. La API Web Serial no funciona en Firefox ni en navegadores dentro de WSL2.

---

## Flujo del Juego y Comportamiento Esperado
### 1. Menú Principal
 * **Bienvenida:** Al ingresar, se debe visualizar el menú de inicio de la trivia.
 * **Interacción:** Al pasar el mouse o hacer clic en **Temática** o **Dificultad**, se deben desplegar las opciones disponibles.
 * **Validación:** Si intentas presionar **Jugar** sin haber seleccionado una dificultad y temática, el sistema debe mostrar una alerta indicando que estas selecciones son obligatorias.
 * **Instrucciones:** Al presionar el botón de instrucciones, se redirigirá a una pestaña con las reglas del juego. El botón **Volver** en esta sección debe regresar al menú principal.
### 2. Dinámica de Partida
 * **Carga:** Una vez seleccionados los parámetros y presionado **Jugar**, aparecerá una pantalla de carga antes de iniciar.
 * **Interfaz de Preguntas:** Se mostrará una pregunta con cuatro opciones de respuesta.
 * **Sistema de Feedback:**
   * **Acierto:** La opción se marca en **verde** y se suman **10 puntos**.
   * **Error:** La opción seleccionada se marca en **rojo**, se resalta la correcta en **verde** y aparece un texto aclaratorio con la respuesta correcta.
 * **Navegación:** Tras responder, aparecerá el botón **Siguiente**. Al presionarlo, se actualiza la barra de progreso y el puntaje acumulado.
### 3. Finalización y Reinicio
 * **Resultados:** Al responder la última pregunta, aparecerá el botón **Ver resultados**. Al hacer clic, se mostrará la pantalla final con el puntaje obtenido (escala 0/50).
 * **Opciones Finales:**
   * **Reintentar:** Reinicia la partida inmediatamente con la misma temática y dificultad elegidas anteriormente.
   * **Inicio:** Regresa al menú principal (manteniendo seleccionadas las opciones iniciales en los selectores).
# Historial de Cambios — Trivia con LEDs

Evolución del proyecto commit por commit: qué cambió, en qué archivos, por qué.

---

## Repo 1: Desarrollo del juego (rama feature + main)

### `a4457de` — Initial commit _(13 abr 2026 · Santiago)_

**Archivo:** `README.md`

Creación del repositorio. Solo se agregó el título del proyecto. Sin código funcional.

---

### `e6ff223` — proyecto subido _(14 abr 2026 · Lucas)_

**Archivos nuevos:** `src/App.css`, `src/App.jsx`, `src/main.jsx`, `src/index.css`, `src/jugarDisplay.jsx`, `index.html`, `vite.config.js`, `package.json`

Subida inicial del proyecto React + Vite. Estado del código:

- `App.jsx`: routing con react-router-dom, estructura base.
- `jugarDisplay.jsx` (raíz, no en components): stub de 6 líneas — solo retornaba `<h1>¡Aquí empieza el juego!</h1>`.
- `App.css`: 236 líneas mezclando estilos globales con específicos de cada pantalla.
- Sin separación de componentes. Sin lógica de juego. Sin API.

---

### `cf160f0` — codigo base de trabajo _(14 abr 2026 · Santiago)_

**Archivos:** `src/App.css`, `src/App.jsx`, `src/index.css`, `src/main.jsx`

Limpieza del código inicial. `App.css` se redujo de 236 a ~80 líneas eliminando estilos redundantes y reglas sin usar. `App.jsx` y `main.jsx` reorganizados.

**Por qué:** el código subido tenía estilos de distintas versiones acumulados, muchos sin aplicar a ningún elemento existente.

---

### `b3c2ecc` — cambios lucas 20/4 _(20 abr 2026 · Santiago)_

**Archivos:** `src/App.css`, `src/App.jsx`

Ajustes de diseño en `App.css` (layout, tipografías, colores base) y refactoring menor en `App.jsx`.

---

### `8b8a996` — cambios de diseño, botones funcionales _(25 abr 2026 · Santiago)_

**Archivos nuevos:** `src/components/ColorBends.jsx`, `src/components/ColorBends.css`, `src/components/Home.jsx`, `src/components/JugarDisplay.jsx`, `src/components/instrucciones.jsx`, `tailwind.config.js`, `postcss.config.js`

**Primer commit con estructura de componentes.** Se crearon:

- `ColorBends.jsx`: fondo animado con gradientes. Componente reutilizable.
- `Home.jsx`: menú principal con navegación a `/JugarDisplay` e `/instrucciones`.
- `JugarDisplay.jsx` (en `/components`): placeholder "En proceso de construcción". Sin lógica de juego aún.
- `instrucciones.jsx`: pantalla de reglas.

**Problema introducido:** todo el layout se definía con `style={{}}` directamente en JSX. Ejemplo real de `Home.jsx` y `JugarDisplay.jsx`:

```jsx
<div
  style={{
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "black",
  }}
>
  <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
    <ColorBends speed={0.4} colors={["#527cdc", "#5f115c"]} />
  </div>
  <div className="main-wrapper" style={{ position: "relative", zIndex: 1 }}>
    ...
  </div>
</div>
```

Este bloque de 3 divs con `style={{}}` se repetiría idéntico en cada pantalla del juego.

---

### `193be58` — version final avanzada _(27 abr 2026 · Santiago)_

**Archivos:** `src/components/JugarDisplay.jsx`, `src/components/datos.jsx` _(nuevo)_, `src/components/Home.jsx`, `src/components/instrucciones.jsx`, `src/components/jugarDisplay.css` _(nuevo)_, `src/components/menudespegable.css` _(nuevo)_, `src/components/menudesplegable.jsx` _(nuevo)_, `src/preguntas.js` _(nuevo)_

Commit más grande de la rama feature. Se implementó la lógica completa del juego.

**Qué se agregó:**

- `datos.jsx`: Context de React (`DatosTrivia`) con estado global de `Tematica`, `Dificultad` y `categorias`. Expuesto via `useDatosTrivia()`.
- `menudesplegable.jsx`: selector de temática y dificultad con dropdown.
- `preguntas.js`: **333 líneas de preguntas hardcodeadas en español** (arrays estáticos). Fuente temporal antes de integrar la API real.
- `JugarDisplay.jsx`: lógica completa — estados (`listaPreguntas`, `indiceActual`, `puntaje`, `opcionElegida`, `respondido`, `juegoTerminado`), `manejarSeleccion()`, `manejarSiguiente()`, `reiniciarJuego()`, pantallas de resultado y error.
- `jugarDisplay.css`: CSS específico de la pantalla de juego extraído de `App.css`.

**Problemas presentes en este commit:**

1. **CSS inline masivo**: el bloque wrapper con `ColorBends` se repite 4 veces dentro de `JugarDisplay` con `style={{}}` (pantalla sin config, pantalla de resultado, pantalla de error, pantalla de juego). Ejemplo:

   ```jsx
   <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
   <h2 className="title" style={{ fontSize: '52px' }}>
   <img src="/back.svg" style={{ position: 'absolute', top: '20px', ... }} />
   ```

2. **Sin abstracción de pantalla**: el wrapper `<div position:relative> <ColorBends/> <div main-wrapper>` se copia sin componetizar.

3. **Fuente de datos local**: `obtenerPreguntas()` de `preguntas.js` — no escala, las preguntas son fijas y en español argentino informal.

---

### `619739b` — constantes de la API _(28 abr 2026 · Tobias)_

**Archivos nuevos:** `src/constants/config.js`, `src/services/api.js`

Separación de responsabilidades: constantes y lógica de red se extraen de los componentes.

**`config.js`** — constantes de configuración:

```js
export const API_BASE_URL = "https://opentdb.com/api.php"; // directo, sin proxy aún
export const API_CATEGORIES_URL = "https://opentdb.com/api_category.php";
export const AMOUNT_QUESTIONS = 5;
export const DIFFICULTY = ["easy", "medium", "hard"]; // array sin usar
export const TYPE = ["multiple", "boolean"]; // array sin usar
```

**`api.js`** — funciones de fetch:

- `fetchCategories()`: obtiene categorías de OpenTDB.
- `fetchQuestions(category, difficulty)`: obtiene preguntas. Retornaba `data.results` directamente (sin el objeto completo con `response_code`).

**Problema:** llamada directa a `https://opentdb.com` sin proxy → falla por CORS en producción. `DIFFICULTY` y `TYPE` son constantes declaradas pero nunca usadas en ningún componente.

---

### `5b2031b` — funciona el fetch de preguntas API _(30 abr 2026 · Santiago)_

**Archivos:** `src/components/JugarDisplay.jsx`, `src/services/api.js`, `src/constants/config.js`, `src/components/datos.jsx`, `src/components/instrucciones.jsx`, `src/components/jugarDisplay.css`, `src/components/menudespegable.css`, `vite.config.js`

**Archivos eliminados:** `src/preguntas.js`

Integración real con OpenTDB. Las preguntas hardcodeadas (`preguntas.js`) se reemplazan por llamadas reales a la API.

**Cambios críticos en `api.js`:**

Se agregó `traducirPreguntas()` — función que llamaba a la **API de Anthropic directamente desde el frontend**:

```js
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ role: "user", content: `Traducí al español argentino...` }],
  }),
});
```

**Por qué esto era un problema grave:**

- **Seguridad**: llamar a `api.anthropic.com` desde el browser requiere la API key expuesta en el frontend (o la llamada falla). Cualquier usuario podría extraer la clave de los DevTools y usarla a su costo.
- **Performance**: cada partida hacía 2 llamadas de red en serie — primero a OpenTDB, luego a Anthropic — antes de mostrar cualquier pregunta. Si Anthropic tardaba o fallaba, el juego quedaba en pantalla de carga.
- **Innecesaria**: OpenTDB tiene categorías en inglés que el juego mostraba sin problema. La traducción automática no era un requisito funcional y se eliminó posteriormente.

**Cambios en `config.js`:** URLs cambiadas a proxy Vite (`/api/api.php`) para evitar CORS. Se agregó `DIFFICULTY_MAP` (objeto de traducción español→inglés) y `OPCIONES_DIFICULTAD` (array para el selector de dificultad).

**Cambios en `JugarDisplay.jsx`:**

- Se importó `fetchQuestions` de `api.js`. Se eliminó `obtenerPreguntas` de `preguntas.js`.
- Se agregaron `useCallback` y `useRef` para el guard de llamadas duplicadas:
  ```js
  const ultimaCargaRef = useRef("");
  // en useEffect:
  const clave = `${Tematica}-${Dificultad}`;
  if (ultimaCargaRef.current === clave) return; // evita doble fetch en StrictMode
  ```
- Se agregaron estados `cargando` y `error` para manejar los estados de la petición.
- Se definió `Pantalla` como componente auxiliar **dentro del mismo archivo** (no como archivo separado).
- `decodificarHTML()` y `transformarPregunta()` como funciones utilitarias en el módulo.

**Problemas que persisten:**

- `Pantalla` definida dentro de `JugarDisplay.jsx` en lugar de su propio archivo.
- Muchos `style={{}}` inline en los early returns y en el botón volver.
- `sin-config-box` y `error-box` como clases CSS separadas pero idénticas.

---

### `e558a91` — menu desplegable y limpieza _(5 may 2026 · Santiago)_

**Archivos:** `src/components/Home.jsx`, `src/components/Home.css` _(nuevo)_, `src/components/instrucciones.jsx`, `src/components/instrucciones.css` _(nuevo)_, `src/components/jugarDisplay.css`, `src/components/menudesplegable.jsx`, `src/services/api.js`

Separación de CSS de `Home` e `instrucciones` a sus propios archivos. Mejoras en el menú desplegable. `api.js` simplificado.

**Por qué:** hasta este punto `Home.css` e `instrucciones.css` no existían — sus estilos estaban mezclados en `App.css`. La separación mejora la mantenibilidad.

---

### `34cad92` — readme agregado _(5 may 2026 · Santiago)_

**Archivo:** `README1.md`

Documentación de instalación y flujo del juego.

---

### `23b81b0` — Cambios30/4 — Merge PR #1 _(18 may 2026 · Santiago)_

**Merge de la rama feature en `main`.** Integró todos los commits anteriores de la rama de trabajo al branch principal. No introduce cambios propios de código — es el punto de unificación del trabajo de ambos colaboradores.

---

## Repo 2: Integración Arduino (commits post-merge)

### `0b9a2c3` — separacion JSX/CSS + integración Arduino _(9 jun 2026 · Lucas)_

**Archivos modificados:** `src/components/JugarDisplay.jsx`, `src/components/Home.jsx`, `src/components/Home.css`, `src/components/instrucciones.jsx`, `src/components/instrucciones.css`, `src/components/jugarDisplay.css`, `src/App.css`, `src/App.jsx`, `src/services/api.js`

**Archivos nuevos:** `src/components/Pantalla.jsx`, `src/components/pantalla.css`, `arduino/trivia_leds/trivia_leds.ino`

**Archivos eliminados:** `src/assets/rugby_ball.png`, `src/assets/rugbyball.svg` (assets sin usar)

Commit de mayor impacto de esta etapa. Tres líneas de trabajo en paralelo:

**1. Extracción del componente `Pantalla`**

El bloque de 3 divs con `ColorBends` que se repetía en cada pantalla se extrajo a `Pantalla.jsx`:

```jsx
// Pantalla.jsx — reemplaza el bloque repetido en cada screen
export default function Pantalla({ colors, contentClassName = "", children }) {
  return (
    <div className="pantalla-wrapper">
      <div className="pantalla-fondo">
        <ColorBends speed={0.4} colors={colors} />
      </div>
      <div className={`main-wrapper pantalla-contenido ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
```

Esto eliminó la repetición en `JugarDisplay`, `Home` e `instrucciones`.

**2. Limpieza de CSS inline en múltiples componentes**

Se movieron los `style={{}}` de `Home.jsx`, `instrucciones.jsx` y `JugarDisplay.jsx` a sus archivos CSS correspondientes. `App.css` se limpió de reglas que habían sido migradas.

**3. Primera integración con Arduino (Web Serial)**

Se agregó `arduino/trivia_leds/trivia_leds.ino` con el sketch inicial para el Digispark. En `JugarDisplay.jsx` se integró la conexión serial:

```js
const serialWriterRef = useRef(null);
const [arduinoConectado, setArduinoConectado] = useState(false);

const conectarArduino = async () => {
  const port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 });
  serialWriterRef.current = port.writable.getWriter();
  setArduinoConectado(true);
};

const enviarLED = async (esCorrecta) => {
  const cmd = esCorrecta ? "G" : "R";
  await serialWriterRef.current.write(new TextEncoder().encode(cmd));
};
```

**Razón del problema:** el Digispark (ATtiny85) no expone un puerto serial estándar. Web Serial requiere un chip conversor UART (CH340, CP2102, FTDI). El Digispark implementa USB por software (V-USB) y su librería `DigiUSB.h` no crea ese perfil de dispositivo, por lo que nunca aparecía en la lista de puertos al llamar `navigator.serial.requestPort()`.

**También en este commit:** se eliminó `traducirPreguntas()` de `api.js` — se removió la llamada insegura a la API de Anthropic desde el frontend. `fetchQuestions` quedó limpio.

**Problemas que persisten tras este commit:**

- `style={{ width: \`${pct}%\` }}` en la barra de progreso (inline style).
- `sin-config-box` y `error-box` — clases CSS idénticas, no mergeadas.
- `blackbox` + mensaje + botón repetido sin componetizar en los early returns.
- Sin `disabled` en los botones de opción (se podía clickear múltiples veces antes de que React procesara el estado).

---

### `f1c1baa` — probamos Web Serial, no funciona _(9 jun 2026 · Lucas)_

**Archivos:** `src/components/JugarDisplay.jsx`, `arduino/trivia_leds/trivia_leds.ino`, `README1.md`

Intento de corregir el protocolo de comunicación con el Arduino.

**Cambios en `trivia_leds.ino`:** migración de `DigiUSB.h` a `DigiCDC.h`. `DigiCDC` expone el Digispark como dispositivo CDC-ACM (emulación serial), que sí aparece en Web Serial. Sin embargo, el Digispark con V-USB en USB 3.0 no lograba mantener la conexión.

**Cambios en `JugarDisplay.jsx`:** ajustes menores en el flujo de conexión serial.

**Resultado:** compilación OK (3696 bytes, 55% flash) pero micronucleus no detectaba el Digispark al intentar el upload. Problema de driver en Windows — el dispositivo aparecía en Administrador de dispositivos pero micronucleus no lo reconocía.

---

### `2527b3d` — first commit _(10 jun 2026 · Lucas)_

**Archivos:** `GYM` _(archivo de texto sin relación al proyecto)_, `README.md`, `lucas_copy_20260609153738/lucas_copy_20260609153738.ino`

Commit de archivos que no deberían estar en el repositorio:

- `GYM`: archivo de texto personal, sin relación al proyecto. Eliminado en la versión final.
- `lucas_copy_.../.ino`: copia de seguridad del sketch de Arduino nombrada con timestamp. Eliminada en la versión final.

---

### `139320e` — Migrar conexión de Web HID a Web Serial con DigiCDC _(10 jun 2026 · Lucas)_

**Archivos:** `src/components/JugarDisplay.jsx`, `arduino/trivia_leds/trivia_leds.ino`

Cambio de protocolo en ambos lados de la comunicación:

**`trivia_leds.ino`:** `DigiUSB.h` → `DigiCDC.h`, `DigiUSB.*` → `SerialUSB.*`.

**`JugarDisplay.jsx`:** `navigator.hid` → `navigator.serial`, el envío cambió de HID report a escritura serial por byte.

**Estado al final de este commit (HEAD antes de las correcciones):** la conexión Web Serial seguía sin funcionar en Windows. Los drivers (LIBUSB-WIN32 y WinUSB vía Zadig) detectaban el Digispark ~5 segundos y luego lo perdían. Incompatibilidad entre el stack HID de Windows y la implementación DigiUSB/DigiCDC en ATtiny85. Ver `documentacion/informe_digispark_webusb.docx` para el análisis técnico completo.

---

## Post-entrega: correcciones de calidad

Cambios aplicados sobre el HEAD del repositorio sin commit nuevo al momento de esta documentación.

### Problema 1 — CSS inline

**Dónde estaba:** `JugarDisplay.jsx` en múltiples versiones, desde `193be58` hasta `139320e`.

El caso más representativo fue la barra de progreso presente desde `193be58`:

```jsx
<div
  className="barra-progreso-relleno"
  style={{ width: `${(indiceActual / listaPreguntas.length) * 100}%` }}
/>
```

**Por qué es malo:** mezcla lógica de presentación en JSX, no es overrideable desde CSS sin `!important`, dificulta encontrar todos los estilos en un solo lugar.

**Solución aplicada:** componente `BarraProgreso` con `useRef` y `useEffect`:

```jsx
function BarraProgreso({ actual, total }) {
  const rellenoRef = useRef(null);
  useEffect(() => {
    if (rellenoRef.current)
      rellenoRef.current.style.width = `${(actual / total) * 100}%`;
  }, [actual, total]);
  return (
    <div className="barra-progreso-fondo">
      <div className="barra-progreso-relleno" ref={rellenoRef} />
    </div>
  );
}
```

El cálculo dinámico se hace de forma imperativa sobre el DOM, sin `style={{}}` en el JSX.

---

### Problema 2 — Falta de componentización

**Dónde estaba:** `JugarDisplay.jsx` desde `0b9a2c3`.

El archivo mezclaba en un solo lugar: lógica de juego, transformación de datos de la API, definición de botones, estructura de pantallas de error, feedback visual y render principal. Cualquier cambio requería navegar 200+ líneas para encontrar qué tocar.

Caso más evidente — dos bloques idénticos copy-paste para los estados sin-config y error:

```jsx
<Pantalla colors={...}>
  <div className="blackbox sin-config-box">
    <p className="cuarenta">...</p>
    <p className="texto-instrucciones">...</p>
    <button onClick={...}>VOLVER AL INICIO</button>
  </div>
</Pantalla>
```

También: el `map` de opciones con lógica de clases inline, el div de feedback inline, botones con sus clases CSS y textos hardcodeados en el render principal, y funciones utilitarias (`decodificarHTML`, `transformarPregunta`) mezcladas con código React.

---

#### Paso 1 — Componentes de UI dentro de `JugarDisplay.jsx`

Se extrajeron 4 componentes que agrupan estructura repetida o lógica de presentación:

**`PantallaMensaje({ colors, titulo, mensaje, onVolver })`**

Reemplaza los dos bloques copy-paste de error y sin-config. En lugar de repetir la estructura `<Pantalla> <blackbox> <p> <p> <button>`, se llama una sola vez con props:

```jsx
// Antes — repetido dos veces con distinto contenido
<Pantalla colors={["#ff4444", "#5f115c"]}>
  <div className="blackbox error-box">
    <p className="cuarenta">⚠️ SIN PREGUNTAS</p>
    <p className="texto-instrucciones">{error}</p>
    <button onClick={() => navegar('/')}>VOLVER AL INICIO</button>
  </div>
</Pantalla>

// Después — una línea con props
<PantallaMensaje colors={["#ff4444", "#5f115c"]} titulo="⚠️ SIN PREGUNTAS" mensaje={error} onVolver={() => navegar("/")} />
```

**`BarraProgreso({ actual, total })`**

Encapsula la barra de progreso y elimina el inline style (ver Problema 1).

**`OpcionesRespuesta({ opciones, respondido, respuesta, opcionElegida, onSeleccionar })`**

Mueve el `map` de opciones y toda la lógica de clases (`opcion-correcta`, `opcion-incorrecta`, `opcion-desactivada`) fuera del render principal:

```jsx
// Antes — lógica de clases inline en el render
{preguntaActual.opciones.map((opcion) => {
  let claseOpcion = 'boton-opcion';
  if (respondido) {
    if (opcion === preguntaActual.respuesta) claseOpcion += ' opcion-correcta';
    else if (opcion === opcionElegida) claseOpcion += ' opcion-incorrecta';
    else claseOpcion += ' opcion-desactivada';
  }
  return <button key={opcion} className={claseOpcion} ...>{opcion}</button>;
})}

// Después — una línea con props
<OpcionesRespuesta opciones={preguntaActual.opciones} respondido={respondido}
  respuesta={preguntaActual.respuesta} opcionElegida={opcionElegida}
  onSeleccionar={manejarSeleccion} />
```

**`MensajeRetroalimentacion({ esCorrecta, respuestaCorrecta })`**

Encapsula el div verde/rojo de feedback con su lógica de clase condicional.

---

#### Paso 2 — Botones separados a `src/components/Botones.jsx`

Los botones tenían sus clases CSS, textos y lógica de presentación hardcodeados en el render de `JugarDisplay.jsx`. Se creó `Botones.jsx` como archivo dedicado que exporta todos los botones del juego:

```jsx
// Botones.jsx
export function BotonVolver({ onClick }) {
  return <button className="jugar-btn-volver" onClick={onClick}>← VOLVER</button>;
}

export function BotonArduino({ conectado, onClick }) {
  return (
    <button className="jugar-btn-arduino" onClick={onClick}>
      {conectado ? "🟢 ARDUINO" : "⚪ ARDUINO"}
    </button>
  );
}

export function BotonSiguiente({ esUltima, onClick }) {
  return (
    <button className="boton-siguiente" onClick={onClick}>
      {esUltima ? "VER RESULTADOS →" : "SIGUIENTE →"}
    </button>
  );
}

export function BotonesResultado({ onReintentar, onInicio }) {
  return (
    <div className="resultado-botones">
      <button onClick={onReintentar}>REINTENTAR</button>
      <button onClick={onInicio}>INICIO</button>
    </div>
  );
}
```

`JugarDisplay.jsx` los importa y solo pasa handlers y estado — no sabe nada de clases CSS ni textos:

```jsx
import { BotonVolver, BotonArduino, BotonSiguiente, BotonesResultado } from "./Botones";

// En el render:
<BotonVolver onClick={() => navegar("/")} />
<BotonArduino conectado={dispositivoUSB} onClick={conectarUSB} />
<BotonSiguiente esUltima={indiceActual + 1 >= listaPreguntas.length} onClick={manejarSiguiente} />
<BotonesResultado onReintentar={reiniciarJuego} onInicio={() => navegar("/")} />
```

**Resultado:** cambiar el texto, estilo o estructura de cualquier botón se hace en `Botones.jsx` sin tocar la lógica del juego.

---

#### Paso 3 — Utilidades a `src/utils/triviaUtils.js`

`decodificarHTML()` y `transformarPregunta()` son funciones puras: reciben datos, devuelven datos transformados, sin estado ni JSX. No pertenecen a un componente React.

```js
// triviaUtils.js
export function decodificarHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export function transformarPregunta(raw) {
  const opciones = [...raw.incorrect_answers, raw.correct_answer]
    .map(decodificarHTML)
    .sort(() => Math.random() - 0.5);
  return {
    pregunta: decodificarHTML(raw.question),
    respuesta: decodificarHTML(raw.correct_answer),
    opciones,
  };
}
```

`JugarDisplay.jsx` importa solo `transformarPregunta` — `decodificarHTML` es un detalle interno de la utilidad. La transformación de datos de la API queda separada de la UI, testeable de forma independiente.

---

#### Resultado final — separación por responsabilidad

| Archivo | Responsabilidad |
|---|---|
| `src/utils/triviaUtils.js` | Transformar datos crudos de la API OpenTDB |
| `src/components/Botones.jsx` | Definir apariencia y texto de cada botón |
| `src/components/JugarDisplay.jsx` | Lógica de juego, estados React, orquestación de UI |

---

### Problema 3 — DRY (Don't Repeat Yourself)

**CSS duplicado:** desde `0b9a2c3`, dos clases idénticas:

```css
.sin-config-box {
  text-align: center;
  gap: 20px;
}
.error-box {
  text-align: center;
  gap: 20px;
}
```

**Solución:** mergeadas en `.pantalla-mensaje-box`.

**CSS redundante en `.jugar-btn-arduino`:** redeclaraba propiedades ya definidas en el selector global `button` con `!important`:

```css
background: rgba(255, 255, 255, 0.1) !important; /* = global */
border: 1px solid rgba(255, 255, 255, 0.3) !important; /* = global */
color: white; /* = global */
cursor: pointer; /* = global */
/* ... */
```

**Solución:** `.jugar-btn-arduino` quedó solo con lo que diferencia del global (posicionamiento absoluto).

**Clases CSS huérfanas:** `btn-usb-conectar`, `usb-ok`, `usb-off` referenciadas en JSX pero inexistentes en ningún archivo CSS.
**Solución:** eliminadas, reemplazadas por `jugar-btn-arduino` existente.

---

### Problema 4 — Llamada innecesaria e insegura a la API

**Dónde estaba:** `src/services/api.js` en el commit `5b2031b`.

`traducirPreguntas()` llamaba directamente a `https://api.anthropic.com/v1/messages` desde el browser:

- **Seguridad**: la API key de Anthropic quedaría expuesta en el frontend, accesible desde DevTools por cualquier usuario.
- **Performance**: dos llamadas de red en serie antes de mostrar preguntas. Si Anthropic fallaba o daba timeout, el juego quedaba bloqueado en pantalla de carga.
- **Innecesaria**: la traducción no era un requisito funcional del juego. Las preguntas en inglés son perfectamente jugables dado que el menú y la UI están en español.

**Cuándo se removió:** en `0b9a2c3`. `fetchQuestions` quedó sin la llamada a Anthropic.

**Estado final de `api.js`:**

```js
export const fetchQuestions = async (category, difficulty) => {
  try {
    const url = `${API_BASE_URL}?amount=${AMOUNT_QUESTIONS}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return null;
  }
};
```

Una sola llamada de red, sin dependencias externas adicionales, con manejo de error.

---

## Métricas del componente principal

| Versión                       | Líneas | Sub-componentes               | Inline styles | Clases CSS duplicadas |
| ----------------------------- | ------ | ----------------------------- | ------------- | --------------------- |
| `193be58` (primer juego real) | ~170   | 0                             | 9+            | —                     |
| `5b2031b` (API real)          | ~200   | 1 (Pantalla, inline)          | 6             | 2                     |
| `0b9a2c3` (post-merge)        | 226    | 0 propios (Pantalla separada) | 2             | 2                     |
| Post-correcciones             | 285    | 4                             | 0             | 0                     |

---

## Proceso de integración React-Arduino

Cronología completa de los intentos de conectar el juego React con el Digispark (ATtiny85). El proceso atravesó cuatro protocolos distintos en dos sistemas operativos.

---

### Etapa 0 — Correcciones del código React (pre-integración hardware)

Antes de abordar la integración con el hardware, se aplicaron las correcciones sugeridas por el profesor sobre el código React:

- Eliminación de CSS inline en JSX (reemplazado por clases CSS y componente `BarraProgreso` con `useRef`)
- Componentización de código repetido (`PantallaMensaje`, `OpcionesRespuesta`, `MensajeRetroalimentacion`)
- Eliminación de la llamada innecesaria e insegura a la API de Anthropic para traducción (`traducirPreguntas()` en `api.js`)
- Merge de clases CSS duplicadas (`.sin-config-box` / `.error-box` → `.pantalla-mensaje-box`)
- Eliminación de clases CSS huérfanas y simplificación de `.jugar-btn-arduino`

Ver sección _Post-entrega: correcciones de calidad_ para el detalle técnico de cada cambio.

---

### Etapa 1 — Hardware: construcción del protoboard y primer sketch

Se armó el circuito en protoboard:

- LED verde en pin 0 del Digispark + resistencia 220Ω
- LED rojo en pin 1 del Digispark + resistencia 220Ω

Se cargó un sketch básico de loop para verificar el encendido de LEDs.

**Problema inmediato — Windows + USB 3.0:** el Digispark no era detectado por Arduino IDE ni por el sistema operativo en los equipos de trabajo (Windows). El Digispark es incompatible con USB 3.0 — V-USB requiere la temporización eléctrica específica de USB 2.0. Se intentaron puertos USB 2.0 del mismo equipo pero el problema persistió.

**Verificación en segunda computadora:** para descartar que el problema fuera del protoboard, se probó el circuito en otra máquina. El hardware funcionaba correctamente — el problema era exclusivamente de drivers en los equipos Windows del equipo de trabajo.

---

### Etapa 2 — Windows: intentos de driver con Zadig

Se intentó forzar el reconocimiento del Digispark en Windows usando **Zadig 2.9**:

1. Instalación del driver Digispark LIBUSB-WIN32 (paquete oficial de Digistump)
2. Reemplazo por driver WinUSB vía Zadig
3. Reinstalación completa del toolchain (Arduino IDE, paquete Digistump AVR Boards 1.7.5)

**Comportamiento observado en todos los intentos:** el Digispark aparecía en el Administrador de dispositivos y en Zadig durante aproximadamente 5 segundos. Pasado ese tiempo, Windows lanzaba un error y dejaba de reconocer el dispositivo completamente. Este comportamiento se repitió de forma consistente independientemente del driver instalado.

**Conclusión de la etapa Windows:** incompatibilidad confirmada entre el stack HID/USB de Windows y la implementación DigiUSB/DigiCDC en ATtiny85. No se encontró solución por software. El Digispark nunca pudo quedar estable en ningún equipo Windows del equipo.

_Commits relacionados: `0b9a2c3`, `f1c1baa`_

---

### Etapa 3 — Mac: Arduino IDE detecta el Digispark

Se cambió el entorno de trabajo a macOS.

Tras instalar las dependencias necesarias (URL de boards de DigistumpArduino, paquete Digistump AVR Boards 1.7.5), Arduino IDE compiló y cargó el sketch al Digispark correctamente. El protoboard respondía como se esperaba.

**Estado del código React en este punto:** usaba `navigator.serial.requestPort()` (Web Serial API). Commit `139320e` — sketch con DigiCDC, JugarDisplay con Web Serial.

---

### Etapa 4 — Mac + Web Serial: Chrome no detecta el dispositivo

Con el Digispark funcionando en Mac vía Arduino IDE, se intentó la conexión desde el browser usando **Web Serial** (`navigator.serial.requestPort()`).

**Resultado:** Chrome no listaba el Digispark en ningún momento. El selector de puertos de Web Serial aparecía vacío o mostraba dispositivos Bluetooth del entorno, nunca el Digispark.

**Por qué falló:** Web Serial requiere un chip conversor UART (CH340, CP2102, FTDI) que traduzca USB a serial estándar CDC-ACM. El Digispark no tiene ese chip — implementa USB íntegramente por software (V-USB). Aunque `DigiCDC.h` emula un perfil CDC, la implementación V-USB en low-speed no es compatible con el perfil CDC-ACM que Chrome reconoce para Web Serial.

_Commit relacionado: `139320e`_

---

### Etapa 5 — Mac + Web HID: descartado

Web HID (`navigator.hid`) fue evaluado como alternativa. Descartado porque los navegadores modernos (Chrome en macOS y Windows) bloquean el acceso directo a dispositivos HID por política de seguridad del sistema operativo. macOS toma control exclusivo de los dispositivos HID, impidiendo que el browser los reclame.

_Mencionado como pendiente en commit `f1c1baa`_

---

### Etapa 6 — Mac + WebUSB: conexión exitosa, HUB interrumpe

Se migró el código React a **WebUSB** (`navigator.usb.requestDevice()`). Este cambio corresponde a las correcciones post-entrega del código (no tiene commit propio, es el estado actual del archivo `src/components/JugarDisplay.jsx`).

**Protocolo implementado:** el Digispark recibe datos mediante HID SET_REPORT (`bRequest = 0x09`). El byte viaja en el campo `wIndex` del setup packet, no en el payload. Se usa `recipient: 'device'` (no `'interface'`) para evitar el bloqueo HID de Chrome:

```js
await device.controlTransferOut({
  requestType: "class",
  recipient: "device",
  request: 0x09,
  value: 0x0000,
  index: letra.charCodeAt(0), // 'V' = 86, 'R' = 82
});
```

**Resultado:** desde Mac, el botón `⚪ ARDUINO` en React detectaba y conectaba el Digispark. Chrome confirmaba la conexión exitosa. Al responder una pregunta, los datos `'V'` y `'R'` se enviaban correctamente — verificado en consola del browser.

**Problema final — Hub USB-C:** el Digispark estaba conectado a la Mac a través de un **hub USB-C** (adaptador, no puerto directo). Al momento de recibir el control transfer:

1. El hub detectaba la actividad eléctrica adicional (o el pico de corriente del LED al encender)
2. El hub interpretaba la anomalía como error de señalización
3. El hub reseteaba el puerto por protección
4. Chrome recibía `NotFoundError: The device was disconnected`

La consola confirmaba que el dato había sido enviado desde React, pero el Digispark no lo recibía ni procesaba — los LEDs no respondían.

**Conclusión final:** el tope fue físico y de entorno, no de código. V-USB corriendo a 16.5 MHz tiene ventanas de respuesta de ~7.5 µs (límite low-speed USB). El hub USB-C moderno es más agresivo que un puerto USB-A directo en la detección de timing anómalo y resetea ante cualquier irregularidad.

**La única solución viable** habría sido conectar el Digispark directamente a un puerto **USB-A 2.0** de la computadora, sin hub intermedio. El equipo de trabajo no disponía de esa configuración en ninguna de las máquinas de prueba al momento de la entrega.

**Alternativas para futuras versiones:**

- Arduino Uno/Nano con chip CH340 o CP2102 → Web Serial estable, sin las limitaciones de V-USB
- Arduino Leonardo, Micro o Pro Micro → USB hardware nativo, WebUSB estable
- Raspberry Pi Pico → USB hardware nativo, sin adaptadores necesarios

Ver `documentacion/informe_digispark_webusb.docx` para el análisis técnico completo de la especificación USB low-speed y el comportamiento del firmware DigiUSB.

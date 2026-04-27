

export const preguntas = {
  hardware: {
    facil: [
      {
        id: "hw-f-1",
        pregunta: "¿Qué componente es el 'cerebro' de la computadora?",
        opciones: ["RAM", "CPU", "GPU", "SSD"],
        respuesta: "CPU",
      },
      {
        id: "hw-f-2",
        pregunta: "¿Para qué sirve la RAM?",
        opciones: [
          "Almacenar archivos permanentemente",
          "Guardar datos temporalmente mientras la PC está encendida",
          "Procesar gráficos",
          "Conectarse a internet",
        ],
        respuesta: "Guardar datos temporalmente mientras la PC está encendida",
      },
      {
        id: "hw-f-3",
        pregunta: "¿Qué significa 'SSD'?",
        opciones: [
          "Super Speed Drive",
          "Solid State Drive",
          "Secondary Storage Device",
          "System Software Disk",
        ],
        respuesta: "Solid State Drive",
      },
      {
        id: "hw-f-4",
        pregunta: "¿Cuál de estos es un dispositivo de entrada?",
        opciones: ["Monitor", "Impresora", "Teclado", "Parlante"],
        respuesta: "Teclado",
      },
      {
        id: "hw-f-5",
        pregunta: "¿Qué hace la GPU?",
        opciones: [
          "Gestiona la memoria RAM",
          "Procesa gráficos e imágenes",
          "Controla el almacenamiento",
          "Administra la energía",
        ],
        respuesta: "Procesa gráficos e imágenes",
      },
    ],
    medio: [
      {
        id: "hw-m-1",
        pregunta: "¿Qué es el socket en una placa madre?",
        opciones: [
          "El conector físico donde se instala el procesador",
          "Un puerto USB externo",
          "La ranura para la RAM",
          "El conector de la fuente de poder",
        ],
        respuesta: "El conector físico donde se instala el procesador",
      },
      {
        id: "hw-m-2",
        pregunta: "¿Qué significa 'DDR' en las memorias RAM?",
        opciones: [
          "Dual Data Rate",
          "Digital Data Recovery",
          "Dynamic Drive Register",
          "Direct Data Read",
        ],
        respuesta: "Dual Data Rate",
      },
      {
        id: "hw-m-3",
        pregunta: "¿Cuál es la diferencia principal entre HDD y SSD?",
        opciones: [
          "El HDD tiene más capacidad siempre",
          "El SSD usa partes mecánicas giratorias, el HDD no",
          "El HDD usa discos magnéticos giratorios, el SSD usa memoria flash",
          "No hay diferencia funcional",
        ],
        respuesta: "El HDD usa discos magnéticos giratorios, el SSD usa memoria flash",
      },
      {
        id: "hw-m-4",
        pregunta: "¿Qué es el chipset en una placa madre?",
        opciones: [
          "Un tipo de procesador secundario",
          "El conjunto de chips que gestiona la comunicación entre CPU, RAM y periféricos",
          "Una batería de respaldo",
          "Un módulo de red inalámbrica",
        ],
        respuesta: "El conjunto de chips que gestiona la comunicación entre CPU, RAM y periféricos",
      },
      {
        id: "hw-m-5",
        pregunta: "¿Qué es el TDP de un procesador?",
        opciones: [
          "Velocidad de procesamiento en terahertz",
          "Total Dissipated Power: el calor máximo que disipa bajo carga",
          "Tipo de driver de pantalla",
          "Protocolo de transferencia de datos",
        ],
        respuesta: "Total Dissipated Power: el calor máximo que disipa bajo carga",
      },
    ],
    dificil: [
      {
        id: "hw-d-1",
        pregunta: "¿Qué es la coherencia de caché en sistemas multiprocesador?",
        opciones: [
          "Sincronizar el reloj entre núcleos",
          "Garantizar que todos los núcleos vean el mismo valor de una dirección de memoria",
          "Repartir la carga de trabajo entre procesadores",
          "Optimizar el ancho de banda del bus de datos",
        ],
        respuesta: "Garantizar que todos los núcleos vean el mismo valor de una dirección de memoria",
      },
      {
        id: "hw-d-2",
        pregunta: "¿Qué diferencia hay entre arquitecturas Von Neumann y Harvard?",
        opciones: [
          "Von Neumann usa registros, Harvard no",
          "Harvard separa buses y memorias de datos e instrucciones; Von Neumann los comparte",
          "Von Neumann es más moderna que Harvard",
          "Harvard solo se usa en supercomputadoras",
        ],
        respuesta: "Harvard separa buses y memorias de datos e instrucciones; Von Neumann los comparte",
      },
      {
        id: "hw-d-3",
        pregunta: "¿Qué es el 'speculative execution' en CPUs modernas?",
        opciones: [
          "Ejecutar instrucciones antes de saber si serán necesarias para mejorar el rendimiento",
          "Asignar tareas a núcleos secundarios de reserva",
          "Reducir el voltaje del núcleo dinámicamente",
          "Predecir fallos de hardware antes de que ocurran",
        ],
        respuesta: "Ejecutar instrucciones antes de saber si serán necesarias para mejorar el rendimiento",
      },
      {
        id: "hw-d-4",
        pregunta: "¿Qué vulnerabilidad explotó el fallo 'Meltdown' en los procesadores?",
        opciones: [
          "Un bug en la memoria caché L3",
          "La ejecución especulativa para leer memoria del kernel desde espacio de usuario",
          "Un fallo en el controlador de interrupciones",
          "Un desbordamiento del bus PCIe",
        ],
        respuesta: "La ejecución especulativa para leer memoria del kernel desde espacio de usuario",
      },
      {
        id: "hw-d-5",
        pregunta: "¿Qué es ECC RAM y para qué se usa?",
        opciones: [
          "RAM de mayor frecuencia para gaming",
          "RAM con circuitos que detectan y corrigen errores de un bit en tiempo real",
          "RAM de doble canal para plataformas de consumo",
          "RAM con disipador de calor integrado",
        ],
        respuesta: "RAM con circuitos que detectan y corrigen errores de un bit en tiempo real",
      },
    ],
  },

  software: {
    facil: [
      {
        id: "sw-f-1",
        pregunta: "¿Cuál de estos es un sistema operativo?",
        opciones: ["Microsoft Word", "Windows 11", "Google Chrome", "Photoshop"],
        respuesta: "Windows 11",
      },
      {
        id: "sw-f-2",
        pregunta: "¿Qué hace un antivirus?",
        opciones: [
          "Acelera la computadora",
          "Detecta y elimina software malicioso",
          "Comprime archivos",
          "Gestiona la memoria RAM",
        ],
        respuesta: "Detecta y elimina software malicioso",
      },
      {
        id: "sw-f-3",
        pregunta: "¿Qué significa 'GUI'?",
        opciones: [
          "General User Interface",
          "Graphical User Interface",
          "Global Unique Identifier",
          "Guided Update Installation",
        ],
        respuesta: "Graphical User Interface",
      },
      {
        id: "sw-f-4",
        pregunta: "¿Cuál de estos es un lenguaje de programación?",
        opciones: ["HTML puro", "PDF", "Python", "JPEG"],
        respuesta: "Python",
      },
      {
        id: "sw-f-5",
        pregunta: "¿Qué hace el comando 'Ctrl + Z' en la mayoría de programas?",
        opciones: ["Guardar el archivo", "Deshacer la última acción", "Cerrar la ventana", "Copiar texto"],
        respuesta: "Deshacer la última acción",
      },
    ],
    medio: [
      {
        id: "sw-m-1",
        pregunta: "¿Qué es el kernel de un sistema operativo?",
        opciones: [
          "La interfaz gráfica del sistema",
          "El núcleo que gestiona recursos de hardware y comunicación con software",
          "El gestor de archivos del sistema",
          "El sistema de actualización automática",
        ],
        respuesta: "El núcleo que gestiona recursos de hardware y comunicación con software",
      },
      {
        id: "sw-m-2",
        pregunta: "¿Qué diferencia hay entre un proceso y un hilo (thread)?",
        opciones: [
          "Son exactamente lo mismo",
          "Un proceso tiene su propio espacio de memoria; un hilo comparte el del proceso padre",
          "Los hilos son más lentos que los procesos",
          "Un proceso solo puede tener un hilo",
        ],
        respuesta: "Un proceso tiene su propio espacio de memoria; un hilo comparte el del proceso padre",
      },
      {
        id: "sw-m-3",
        pregunta: "¿Qué es la programación orientada a objetos (POO)?",
        opciones: [
          "Programar usando solo funciones matemáticas",
          "Un paradigma que organiza el código en objetos con atributos y métodos",
          "Programación visual sin escribir código",
          "Un método para optimizar bases de datos",
        ],
        respuesta: "Un paradigma que organiza el código en objetos con atributos y métodos",
      },
      {
        id: "sw-m-4",
        pregunta: "¿Qué es Git?",
        opciones: [
          "Un lenguaje de programación",
          "Un sistema de control de versiones distribuido",
          "Un IDE para desarrollo web",
          "Un gestor de paquetes de Python",
        ],
        respuesta: "Un sistema de control de versiones distribuido",
      },
      {
        id: "sw-m-5",
        pregunta: "¿Qué hace el garbage collector en lenguajes como Java o Python?",
        opciones: [
          "Elimina archivos temporales del disco",
          "Libera automáticamente la memoria que ya no usa el programa",
          "Optimiza el código compilado",
          "Detecta errores de sintaxis",
        ],
        respuesta: "Libera automáticamente la memoria que ya no usa el programa",
      },
    ],
    dificil: [
      {
        id: "sw-d-1",
        pregunta: "¿Qué es el problema del 'deadlock' y cuáles son sus cuatro condiciones de Coffman?",
        opciones: [
          "Un bucle infinito; las condiciones son: inicialización, ejecución, finalización y reinicio",
          "Bloqueo mutuo entre procesos; condiciones: exclusión mutua, retención y espera, no apropiación y espera circular",
          "Una fuga de memoria; condiciones: asignación, uso, liberación y reasignación",
          "Un error de compilación; condiciones: sintaxis, semántica, tipo y lógica",
        ],
        respuesta: "Bloqueo mutuo entre procesos; condiciones: exclusión mutua, retención y espera, no apropiación y espera circular",
      },
      {
        id: "sw-d-2",
        pregunta: "¿Qué es el patrón de diseño 'Observer'?",
        opciones: [
          "Un patrón donde un objeto clona instancias de sí mismo",
          "Un patrón donde un sujeto notifica automáticamente a sus dependientes ante cambios de estado",
          "Un patrón para acceder a una única instancia global",
          "Un patrón para encapsular algoritmos intercambiables",
        ],
        respuesta: "Un patrón donde un sujeto notifica automáticamente a sus dependientes ante cambios de estado",
      },
      {
        id: "sw-d-3",
        pregunta: "¿Qué es el algoritmo de Dijkstra?",
        opciones: [
          "Un algoritmo de ordenamiento por intercambio",
          "Un algoritmo para encontrar el camino más corto en un grafo con pesos no negativos",
          "Un método de compresión de datos sin pérdida",
          "Un protocolo de sincronización de procesos",
        ],
        respuesta: "Un algoritmo para encontrar el camino más corto en un grafo con pesos no negativos",
      },
      {
        id: "sw-d-4",
        pregunta: "¿Qué es la inyección de dependencias (Dependency Injection)?",
        opciones: [
          "Inyectar código malicioso en una aplicación",
          "Un patrón donde las dependencias de un objeto se pasan desde el exterior en vez de crearlas internamente",
          "Importar librerías externas en tiempo de compilación",
          "Cargar módulos dinámicamente en tiempo de ejecución",
        ],
        respuesta: "Un patrón donde las dependencias de un objeto se pasan desde el exterior en vez de crearlas internamente",
      },
      {
        id: "sw-d-5",
        pregunta: "¿Qué garantiza ACID en bases de datos relacionales?",
        opciones: [
          "Velocidad, Integridad, Compatibilidad y Durabilidad",
          "Atomicidad, Consistencia, Aislamiento y Durabilidad",
          "Autenticación, Cifrado, Integridad y Disponibilidad",
          "Atomicidad, Compresión, Indexación y Distribución",
        ],
        respuesta: "Atomicidad, Consistencia, Aislamiento y Durabilidad",
      },
    ],
  },
};

// Función utilitaria: obtiene 5 preguntas de una temática/dificultad
export function obtenerPreguntas(tematica, dificultad, cantidad = 5) {
  const grupo = preguntas[tematica]?.[dificultad] ?? [];
  const barajadas = [...grupo].sort(() => Math.random() - 0.5);
  return barajadas.slice(0, cantidad);
}
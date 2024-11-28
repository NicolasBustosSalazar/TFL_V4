//ingreso de valores
document.getElementById("inputTexto").addEventListener("input", function () {
  const inputText = this.value; // Captura el texto ingresado
  const btnBinary = document.getElementById("btnBinary");
  const btnPSK = document.getElementById("btnPSK");
  const btn4PSK = document.getElementById("btn4PSK");
  const btn8PSK = document.getElementById("btn8PSK");
  const message = document.getElementById("message") || createMessageElement();

  // Resetear mensaje
  message.textContent = "";

  // Lógica para habilitar o deshabilitar botones según la longitud del texto
  if (inputText.length === 0) {
    enableButtons([btnBinary, btnPSK, btn4PSK, btn8PSK]);
    const psktable = document.getElementById("psk_table");
    const psktable4 = document.getElementById("4psk_table");
    const psktable8 = document.getElementById("8psk_table");
    const PSKChartWrapper = document.getElementById("PSKChartWrapper");
    const PSKChartWrapper4 = document.getElementById("4PSKChartWrapper");
    const PSKChartWrapper8 = document.getElementById("8PSKChartWrapper");
    const binaryChart = document.getElementById("binaryChartWrapper");
    psktable.classList.add("hidden");
    psktable4.classList.add("hidden");
    psktable8.classList.add("hidden");
    PSKChartWrapper4.classList.add("hidden");
    PSKChartWrapper8.classList.add("hidden");
    PSKChartWrapper.classList.add("hidden");
    binaryChart.classList.add("hidden");
  } else if (inputText.length === 1 || inputText.length === 2) {
    enableButtons([btnBinary, btnPSK, btn4PSK]);
    disableButtons([btn8PSK]);
  } else if (inputText.length === 3) {
    enableButtons([btnBinary, btnPSK, btn4PSK, btn8PSK]);
  } else {
    enableButtons([btnBinary]);
    disableButtons([btnPSK, btn4PSK, btn8PSK]);
    message.textContent =
      "Por favor, ingrese hasta 3 caracteres para ver la modulación PSK.";
    if (message) {
      message.style.color = "red"; // Cambia el color del texto a rojo
      message.style.backgroundColor = "white"; // Cambia el fondo a blanco
    }
    const psktable = document.getElementById("psk_table");
    const psktable4 = document.getElementById("4psk_table");
    const psktable8 = document.getElementById("8psk_table");
    const PSKChartWrapper = document.getElementById("PSKChartWrapper");
    const PSKChartWrapper4 = document.getElementById("4PSKChartWrapper");
    const PSKChartWrapper8 = document.getElementById("8PSKChartWrapper");
    psktable.classList.add("hidden");
    psktable4.classList.add("hidden");
    psktable8.classList.add("hidden");
    PSKChartWrapper4.classList.add("hidden");
    PSKChartWrapper8.classList.add("hidden");
    PSKChartWrapper.classList.add("hidden");
  }
});

// Función para habilitar botones
function enableButtons(buttons) {
  buttons.forEach((button) => {
    button.disabled = false;
  });
}

// Función para deshabilitar botones
function disableButtons(buttons) {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

// Función para crear el elemento de mensaje si no existe
function createMessageElement() {
  const messageElement = document.createElement("p");
  messageElement.id = "message";
  messageElement.style.color = "red";
  messageElement.style.marginTop = "10px";
  document.body.appendChild(messageElement);

  return messageElement;
}

let binaryChart = null; // Variable global para almacenar el gráfico binario
let pskChart = null; // Variable global para almacenar el gráfico PSK

document.getElementById("btnBinary").addEventListener("click", function () {
  const inputTexto = document.getElementById("inputTexto").value;
  const messageElement = document.getElementById("message");
  const binaryChartWrapper = document.getElementById("binaryChartWrapper");
  const canvas = document.getElementById("binaryChart");

  if (!inputTexto) {
    messageElement.textContent = "Por favor ingresa un caracter.";
    messageElement.style.color = "red";
    messageElement.style.backgroundColor = "white";
    return;
  }

  // Convertir texto a ASCII y luego a binario
  const binaryValues = Array.from(inputTexto)
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

  messageElement.textContent = `Codigo ASCII: ${binaryValues}`;
  messageElement.style.color = "white";
  messageElement.style.backgroundColor = "#3b3c49";
  // Crear datos para graficar
  const binaryArray = binaryValues.split("").map(Number); // Convertir a array de números

  // Configuración del gráfico
  const data = {
    labels: binaryArray, // Mostrar los valores binarios en el eje X
    datasets: [
      {
        label: "Señal Binaria",
        data: binaryArray,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        stepped: true,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Valores Binarios",
            color: "white",
          },
          ticks: {
            callback: function (value, index) {
              // Mostrar cada valor binario en el eje X
              return data.labels[index];
            },
            color: "white",
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            callback: (value) => (value === 0 || value === 1 ? value : ""),
            color: "white",
          },
        },
      },
    },
  };

  // Destruir el gráfico anterior si existe
  if (binaryChart) {
    binaryChart.destroy();
  }
  const PSKChartWrapper = document.getElementById("PSKChartWrapper");
  const PSKChartWrapper4 = document.getElementById("4PSKChartWrapper");
  const PSKChartWrapper8 = document.getElementById("8PSKChartWrapper");
  PSKChartWrapper.classList.add("hidden");
  PSKChartWrapper4.classList.add("hidden");
  PSKChartWrapper8.classList.add("hidden");
  // Mostrar el gráfico
  binaryChartWrapper.classList.remove("hidden");
  binaryChart = new Chart(canvas, config); // Almacenar el nuevo gráfico
});

document.getElementById("btnPSK").addEventListener("click", function () {
  const inputTexto = document.getElementById("inputTexto").value;
  const messageElement = document.getElementById("message");
  const PSKChartWrapper = document.getElementById("PSKChartWrapper");
  const PSKChartWrapper4 = document.getElementById("4PSKChartWrapper");
  const PSKChartWrapper8 = document.getElementById("8PSKChartWrapper");
  const canvas = document.getElementById("PSKChart");
  const psktable = document.getElementById("psk_table");
  const psktable4 = document.getElementById("4psk_table");
  const psktable8 = document.getElementById("8psk_table");
  if (!inputTexto) {
    messageElement.textContent = "Por favor ingresa un caracter.";
    return;
  }

  // Convertir texto a ASCII y luego a binario
  const binaryValues = Array.from(inputTexto)
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

  messageElement.textContent = `Codigo ASCII: ${binaryValues}`;
  messageElement.style.color = "white";
  messageElement.style.backgroundColor = "#3b3c49";
  // Parámetros para la generación de la señal PSK
  const binaryArray = binaryValues.split("").map(Number); // Convertir a array de números
  const samplesPerBit = 100; // Número de muestras por bit
  const carrierFrequency = 2 * Math.PI; // Frecuencia angular de la portadora
  const timeStep = 1 / samplesPerBit; // Paso de tiempo
  const duration = binaryArray.length; // Duración de la señal

  // Generar la onda portadora
  function generateCarrierWave(timeData) {
    let carrierWave = [];
    for (let t of timeData) {
      carrierWave.push(Math.sin(carrierFrequency * t));
    }
    return carrierWave;
  }

  // Generar la señal PSK
  function generatePSKWave(binaryString, timeData) {
    let pskWave = [];
    for (let t of timeData) {
      const bitIndex = Math.floor(t / 1); // Cada bit dura 1 unidad de tiempo
      const bit = bitIndex < binaryString.length ? binaryString[bitIndex] : 0;
      const phaseShift = bit === 1 ? Math.PI : 0;
      pskWave.push(Math.sin(carrierFrequency * t + phaseShift));
    }
    return pskWave;
  }

  // Crear datos de tiempo para toda la señal
  const timeData = [];
  for (let t = 0; t < duration; t += timeStep) {
    timeData.push(t);
  }

  // Generar señal PSK
  const pskWave = generatePSKWave(binaryArray, timeData);

  // Configurar las etiquetas del eje X (mostrar solo los bits)
  const xLabels = [];
  for (let i = 0; i < binaryArray.length; i++) {
    xLabels.push(binaryArray[i]); // Agregar cada bit como etiqueta
    for (let j = 1; j < samplesPerBit; j++) {
      xLabels.push(""); // Dejar espacio vacío entre etiquetas
    }
  }

  // Configuración del gráfico
  const data = {
    labels: xLabels, // Etiquetas en el eje X (ceros y unos)
    datasets: [
      {
        label: "Señal PSK",
        data: pskWave,
        borderColor: "rgba(192, 75, 75, 1)",
        borderWidth: 2,
        pointRadius: 0, // Elimina los puntos en el gráfico
        fill: false,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Bits",
            color: "white", // Cambiar color del título del eje X
          },
          ticks: {
            callback: function (value, index) {
              // Mostrar solo los bits en las etiquetas
              return xLabels[index];
            },
            color: "white", // Cambiar color de las etiquetas del eje X
            autoSkip: false, // No omitir etiquetas
            maxRotation: 0,
          },
          grid: {
            display: false, // Ocultar las líneas de la cuadrícula en el eje X
          },
        },
        y: {
          title: {
            display: false,
            text: "Amplitud",
            color: "white", // Cambiar color del título del eje Y (si se muestra)
          },
          ticks: {
            color: "white", // Cambiar color de las etiquetas del eje Y
          },
          grid: {
            display: false, // Ocultar las líneas de la cuadrícula en el eje Y
          },
        },
      },
    },
  };

  // Destruir el gráfico anterior si existe
  if (pskChart) {
    pskChart.destroy();
  }

  console.log(duration * timeStep, "ms");

  const binaryChart = document.getElementById("binaryChartWrapper");
  binaryChart.classList.add("hidden");
  // Mostrar el gráfico
  PSKChartWrapper4.classList.add("hidden");
  PSKChartWrapper8.classList.add("hidden");
  PSKChartWrapper.classList.remove("hidden");
  psktable.classList.remove("hidden");
  psktable4.classList.add("hidden");
  psktable8.classList.add("hidden");
  pskChart = new Chart(canvas, config); // Almacenar el nuevo gráfico
});

let psk4Chart = null; // Cambiar el nombre de la variable para evitar confusión

// 1. Función para inicializar el canvas
function initializeCanvas() {
  const canvas = document.getElementById("4PSKChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 2. Función para generar la modulación 4PSK
function generate4PSK(binaryString) {
  const samplesPerSymbol = 100;
  const carrierFrequency = 2 * Math.PI;
  const binaryArray = binaryString.split("").map(Number);
  const totalSymbols = Math.floor(binaryArray.length / 2);
  const timeStep = 1 / samplesPerSymbol;

  // Crear datos de tiempo y señal
  const timeData = [];
  const pskWave = [];
  const xLabels = [];

  for (let t = 0; t < totalSymbols * samplesPerSymbol; t++) {
    const symbolIndex = Math.floor(t / samplesPerSymbol);
    if (symbolIndex < binaryArray.length / 2) {
      const symbolBits = binaryString.substr(symbolIndex * 2, 2);
      const symbol = parseInt(symbolBits, 2);
      const phaseShift = (symbol * Math.PI) / 2;

      // Señal modulada
      pskWave.push(Math.sin(carrierFrequency * t * timeStep + phaseShift));

      // Etiquetas del eje X
      if (t % samplesPerSymbol === 0) {
        xLabels.push(symbolBits); // Pares de bits
      } else {
        xLabels.push(""); // Espacios vacíos
      }

      timeData.push(t * timeStep); // Tiempo
    }
  }
  console.log(totalSymbols * timeStep, "milisegundos 4PSK");
  return { timeData, pskWave, xLabels };
}

// 3. Función para graficar la señal 4PSK
function plot4PSK(pskWave, xLabels) {
  const canvas = document.getElementById("4PSKChart");
  const data = {
    labels: xLabels,
    datasets: [
      {
        label: "Señal 4PSK",
        data: pskWave,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: "Pares de Bits" },
          ticks: { autoSkip: false, maxRotation: 0, color: "white" },
          grid: { display: false },
          color: "white",
        },
        y: {
          grid: { display: false },
        },
      },
    },
  };

  if (pskChart) pskChart.destroy(); // Eliminar gráfico previo
  pskChart = new Chart(canvas, config);
}

// Evento para generar la modulación y graficarla
document.getElementById("btn4PSK").addEventListener("click", function () {
  const inputTexto = document.getElementById("inputTexto").value;
  const messageElement = document.getElementById("message");
  const PSKChartWrapper = document.getElementById("4PSKChartWrapper");
  const PSKChartWrapper1 = document.getElementById("PSKChartWrapper");
  const PSKChartWrapper8 = document.getElementById("8PSKChartWrapper");
  const psktable = document.getElementById("psk_table");
  const psktable4 = document.getElementById("4psk_table");
  const psktable8 = document.getElementById("8psk_table");
  if (!inputTexto) {
    messageElement.textContent = "Por favor ingresa un caracter.";
    return;
  }

  // Convertir texto a binario
  const binaryValues = Array.from(inputTexto)
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

  messageElement.textContent = `Codigo ASCII: ${binaryValues}`;
  messageElement.style.color = "white";
  messageElement.style.backgroundColor = "#3b3c49";
  initializeCanvas();
  const binaryChart = document.getElementById("binaryChartWrapper");
  binaryChart.classList.add("hidden");
  // Generar y graficar la señal 4PSK
  const { timeData, pskWave, xLabels } = generate4PSK(binaryValues);
  PSKChartWrapper1.classList.add("hidden");
  PSKChartWrapper8.classList.add("hidden");
  PSKChartWrapper.classList.remove("hidden");
  psktable4.classList.remove("hidden");
  psktable.classList.add("hidden");
  psktable8.classList.add("hidden");
  plot4PSK(pskWave, xLabels);
});

// 1. Función para inicializar el canvas
function initializeCanvas() {
  const canvas = document.getElementById("8PSKChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 2. Función para generar la modulación 8PSK
function generate8PSK(binaryString) {
  const samplesPerSymbol = 100;
  const carrierFrequency = 2 * Math.PI;
  const binaryArray = binaryString.split("").map(Number);
  const totalSymbols = Math.floor(binaryArray.length / 3); // 3 bits por símbolo
  const timeStep = 1 / samplesPerSymbol;

  const timeData = [];
  const pskWave = [];
  const xLabels = [];

  for (let t = 0; t < totalSymbols * samplesPerSymbol; t++) {
    const symbolIndex = Math.floor(t / samplesPerSymbol);
    if (symbolIndex < binaryArray.length / 3) {
      const symbolBits = binaryString.substr(symbolIndex * 3, 3); // 3 bits por símbolo
      const symbol = parseInt(symbolBits, 2); // Convertir a decimal
      const phaseShift = (symbol * Math.PI) / 4; // Fase para 8PSK (8 niveles)

      // Señal modulada
      pskWave.push(Math.sin(carrierFrequency * t * timeStep + phaseShift));

      // Etiquetas del eje X
      if (t % samplesPerSymbol === 0) {
        xLabels.push(symbolBits); // Grupos de 3 bits
      } else {
        xLabels.push(""); // Espacios vacíos
      }

      timeData.push(t * timeStep); // Tiempo
    }
  }
  return { timeData, pskWave, xLabels };
}

// 3. Función para graficar la señal 8PSK
function plot8PSK(pskWave, xLabels) {
  const canvas = document.getElementById("8PSKChart");
  const data = {
    labels: xLabels,
    datasets: [
      {
        label: "Señal 8PSK",
        data: pskWave,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: "Triplas de Bits" },
          ticks: { autoSkip: false, maxRotation: 0, color: "white" },
          grid: { display: false }, // Oculta líneas del eje X
        },
        y: {
          grid: { display: false }, // Oculta líneas del eje Y
        },
      },
    },
  };

  if (pskChart) pskChart.destroy(); // Elimina gráfico previo
  pskChart = new Chart(canvas, config);
}

// Evento para generar la modulación y graficarla
document.getElementById("btn8PSK").addEventListener("click", function () {
  const inputTexto = document.getElementById("inputTexto").value;
  const messageElement = document.getElementById("message");
  const PSKChartWrapper4 = document.getElementById("4PSKChartWrapper");
  const PSKChartWrapper1 = document.getElementById("PSKChartWrapper");
  const PSKChartWrapper = document.getElementById("8PSKChartWrapper");
  const psktable = document.getElementById("psk_table");
  const psktable4 = document.getElementById("4psk_table");
  const psktable8 = document.getElementById("8psk_table");
  if (!inputTexto) {
    messageElement.textContent = "Por favor ingresa un caracter.";
    return;
  }

  // Convertir texto a binario
  const binaryValues = Array.from(inputTexto)
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

  messageElement.textContent = `Codigo ASCII: ${binaryValues}`;
  messageElement.style.color = "white";
  messageElement.style.backgroundColor = "#3b3c49";
  initializeCanvas();

  const binaryChart = document.getElementById("binaryChartWrapper");
  binaryChart.classList.add("hidden");
  // Generar y graficar la señal 8PSK
  const { timeData, pskWave, xLabels } = generate8PSK(binaryValues);
  PSKChartWrapper4.classList.add("hidden");
  PSKChartWrapper1.classList.add("hidden");
  PSKChartWrapper.classList.remove("hidden");
  psktable8.classList.remove("hidden");
  psktable.classList.add("hidden");
  psktable4.classList.add("hidden");
  plot8PSK(pskWave, xLabels);
});

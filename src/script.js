const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input--color");
const tools = document.querySelectorAll(".button--tool");
const sizeButtons = document.querySelectorAll(".button--size");
const bucketTool = document.getElementById("bucket-tool");
const imageTool = document.getElementById("image-tool");
const imageBtn = document.getElementById("image-btn");

let selectedColor = "#0aceff"; // Cor padrão
let currentTool = "brush"; // Ferramenta padrão
let brushSize = 80;
let isPainting = false;

// Função para desenhar imagem no canvas
imageTool.addEventListener("click", () => {
  const img = new Image();
  img.src = imageBtn.src;

  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
});

// Função para escolher a cor do balde
inputColor.addEventListener("change", ({ target }) => {
  selectedColor = target.value;
  ctx.fillStyle = selectedColor;
});

// Escolher ferramenta
tools.forEach((tool) => {
  tool.addEventListener("click", function () {
    const action = this.getAttribute("data-action");
    if (action === "brush" || action === "rubber" || action === "bucket") {
      currentTool = action;
    }
  });
});

// // Função de desenho
// const draw = (x, y) => {
//   ctx.beginPath();
//   ctx.arc(
//     x - canvas.offsetLeft,
//     y - canvas.offsetTop,
//     brushSize / 2,
//     0,
//     2 * Math.PI
//   );
//   ctx.fill();
// };

// Função de preenchimento com balde de tinta (Flood Fill)
function floodFill(x, y, fillColor) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const targetColor = getPixel(imageData, x, y);
  const tolerance = 10;
  const fillColorArray = hexToRGBA(fillColor);

  floodFillAlgorithm(imageData, x, y, targetColor, fillColorArray, tolerance);

  ctx.putImageData(imageData, 0, 0);
}

function getPixel(imageData, x, y) {
  const index = (y * imageData.width + x) * 4;
  return [
    imageData.data[index],
    imageData.data[index + 1],
    imageData.data[index + 2],
    imageData.data[index + 3],
  ];
}

function setPixel(imageData, x, y, color) {
  const index = (y * imageData.width + x) * 4;
  imageData.data[index] = color[0]; // Red
  imageData.data[index + 1] = color[1]; // Green
  imageData.data[index + 2] = color[2]; // Blue
  imageData.data[index + 3] = color[3]; // Alpha
}

function colorsMatch(a, b, tolerance) {
  return (
    Math.abs(a[0] - b[0]) <= tolerance &&
    Math.abs(a[1] - b[1]) <= tolerance &&
    Math.abs(a[2] - b[2]) <= tolerance &&
    Math.abs(a[3] - b[3]) <= tolerance
  );
}

function floodFillAlgorithm(
  imageData,
  x,
  y,
  targetColor,
  fillColor,
  tolerance
) {
  const queue = [[x, y]];
  const width = imageData.width;
  const height = imageData.height;
  const visited = new Set();

  while (queue.length > 0) {
    const [cx, cy] = queue.shift();
    const key = `${cx},${cy}`;

    if (cx < 0 || cx >= width || cy < 0 || cy >= height || visited.has(key)) {
      continue;
    }

    const currentColor = getPixel(imageData, cx, cy);
    if (colorsMatch(currentColor, targetColor, tolerance)) {
      setPixel(imageData, cx, cy, fillColor);
      visited.add(key);

      queue.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
    }
  }
}

function hexToRGBA(hex) {
  let r = 0,
    g = 0,
    b = 0,
    a = 255;

  if (hex.length === 7) {
    // #RRGGBB
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else if (hex.length === 9) {
    // #RRGGBBAA
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
    a = parseInt(hex.slice(7, 9), 16);
  }

  return [r, g, b, a];
}

// Evento mousedown para desenhar ou preencher
canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
  if (currentTool === "brush") {
    isPainting = true;
    draw(clientX, clientY);
  } else if (currentTool === "bucket") {
    const x = clientX - canvas.offsetLeft;
    const y = clientY - canvas.offsetTop;
    floodFill(x, y, selectedColor);
  }
});

// Ao mover o mouse junto com a função isPainting, ele irá desenhar
canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
  if (isPainting && currentTool === "brush") {
    draw(clientX, clientY);
  }
});

canvas.addEventListener("mouseup", () => {
  isPainting = false;
});

bucketTool.addEventListener("click", () => {
  currentTool = "bucket";
});

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input--color");
const tools = document.querySelector(".button--tool");
const sizeButtons = document.querySelector(".button--size");
const ButtonClear = document.querySelector(".button--clear");

let brushSize = 80;

canvas.addEventListener("mousedown", () => {
  const { clientX, clientY } = event;
  draw(clientX, clientY);
});

const draw = (x, y) => {
  ctx.fillStyle = "#000";
  ctx.fillRect(
    x - canvas.offsetLeft,
    y - canvas.offsetTop,
    brushSize,
    brushSize
  );
};

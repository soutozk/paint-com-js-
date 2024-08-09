const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input--color");
const tools = document.querySelector(".button--tool");
const sizeButtons = document.querySelector(".button--size");
const ButtonClear = document.querySelector(".button--clear");

let brushSize = 80;
ctx.fillStyle = "#000";
canvas.addEventListener("mousedown", () => {
  const { clientX, clientY } = event;
  draw(clientX, clientY);
});

const draw = (x, y) => {
  ctx.beginPath();
  ctx.arc(
    x - canvas.offsetLeft,
    y - canvas.offsetTop,
    brushSize,
    0,
    2 * Math.PI
  );
  ctx.fill();

  //   ctx.fillRect(
  //     x - canvas.offsetLeft,
  //     y - canvas.offsetTop,
  //     brushSize,
  //     brushSize
  //   );
};

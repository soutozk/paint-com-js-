const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input--color");
const tools = document.querySelector(".button--tool");
const sizeButtons = document.querySelector(".button--size");
const ButtonClear = document.querySelector(".button--clear");

let brushSize = 80;

let isPainting = false;

inputColor.addEventListener("change", ({ target }) => {
  ctx.fillStyle = target.value;
});
//torna o ispainting true ao clicar no botao direito
canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
  draw(clientX, clientY);
  isPainting = true;
});
//torna
canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
  if (isPainting) {
    draw(clientX, clientY);
  }
});

canvas.addEventListener("mouseup", ({ clientX, clientY }) => {
  isPainting = false;
});

const draw = (x, y) => {
  ctx.beginPath();
  ctx.arc(
    x - canvas.offsetLeft,
    y - canvas.offsetTop,
    brushSize / 2,
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

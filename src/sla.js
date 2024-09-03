const pincelCursor = document.getElementById("pincelCursor");
const colorPicker = document.getElementById("colorPicker");
const pincelWidth = 45;
const pincelHeight = 45;

// Mostra o pincel
canvas.addEventListener("mouseenter", function () {
  pincelCursor.style.display = "block";
});

// Esconde o pincel
canvas.addEventListener("mouseleave", function () {
  pincelCursor.style.display = "none";
});

canvas.addEventListener("mousemove", function (e) {
  pincelCursor.style.left = `${e.pageX - pincelWidth / 8}px`;
  pincelCursor.style.top = `${e.pageY - pincelHeight / 2}px`;
});

inputColor.addEventListener("change", ({ target }) => {
  selectedColor = target.value;
  ctx.fillStyle = selectedColor;
  // Aplica a cor da ponta do pincel
  pincelCursor.style.filter = `drop-shadow(5 0 50px ${selectedColor})`;
});

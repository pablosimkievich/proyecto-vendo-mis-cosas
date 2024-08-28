

document.addEventListener("DOMContentLoaded", function () {
  generateAvatar();

  document
    .getElementById("changeAvatarButton")
    .addEventListener("click", function () {
      generateAvatar();
    });

  document
    .getElementById("registerForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      try {
      // Obtener imagen como base64
      let canvas = document.getElementById("avatarCanvas");
      let dataURL = canvas.toDataURL("image/png");
      document.getElementById("avatarInput").value = dataURL; // Pasa la imagen base64 al campo oculto

      // console.log("Base64 Data URL:", dataURL);

      const formData = new FormData(document.getElementById("registerForm"));
      let data = new URLSearchParams(formData);

      // Iterar sobre los pares clave-valor
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Enviar el formulario con fetch
      /*
      await fetch("/register", {
        method: "POST",
        body: data,
        })
        */

        this.submit()
      } catch(error) {
        console.log(error)
      }

      

    });

  function generateAvatar() {
    // Create a canvas and get its context
    const canvasSize = 200;
    const pixelSize = 20;
    const numPixels = canvasSize / pixelSize;

    var canvas = document.getElementById("avatarCanvas");
    var context = canvas.getContext("2d");

    // Function to generate a random color
    function getRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    // Function to draw a pixel
    function drawPixel(x, y, color) {
      context.fillStyle = color;
      context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }

    // Function to draw a symmetric pixel
    function drawSymmetricPixel(x, y, color) {
      drawPixel(x, y, color);
      drawPixel(numPixels - 1 - x, y, color);
      drawPixel(x, numPixels - 1 - y, color);
      drawPixel(numPixels - 1 - x, numPixels - 1 - y, color);
    }

    // Generate the avatar with symmetry
    for (var x = 0; x < numPixels / 2; x++) {
      for (var y = 0; y < numPixels / 2; y++) {
        var isWhite = Math.random() > 0.5;
        var pixelColor = isWhite ? "#ffffff" : getRandomColor();
        drawSymmetricPixel(x, y, pixelColor);
      }
    }
  }
});

// Para el input de la imagen principal
const mainImageUpload = document.getElementById('main-image-upload');
const mainImageLabel = document.querySelector('label[for="main-image-upload"]');

mainImageUpload.addEventListener('change', function() {
    const fileName = this.files[0].name;
    mainImageLabel.textContent = fileName;
});

// Para el input de imágenes adicionales
const additionalImagesUpload = document.getElementById('additional-images-upload');
const additionalImagesLabel = document.querySelector('label[for="additional-images-upload"]');

additionalImagesUpload.addEventListener('change', function() {
    const fileCount = this.files.length;
    additionalImagesLabel.textContent = `${fileCount} archivo(s) seleccionado(s)`;
});
document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('mouseover', function() {
        // Actualiza la imagen en el display
        const imageDisplay = document.querySelector('.image-display .image');
        imageDisplay.src = this.src;

        // Resalta la thumb activa
        document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});
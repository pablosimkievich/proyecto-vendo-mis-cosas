const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController.js')
const onlyAuthMidleware = require('../middlewares/onlyAuthMiddleware.js')
const validateAddProduct = require('../middlewares/addProductFormValidation.js')
const validateUpdateProduct = require('../middlewares/updateProductValidation')




// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/products'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Obtiene la extensión del archivo
        const baseName = path.basename(file.originalname, ext); // Obtiene el nombre sin la extensión
        cb(null, `${baseName}-${Date.now()}${ext}`); // Genera un nuevo nombre con sufijo de timestamp
    }
});

// Filtro para validar los tipos de archivo
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes.'));
    }
};

// Inicializa Multer con la configuración
const upload = multer({ storage: storage, fileFilter: fileFilter });



// ? Lista de Productos
router.get('/productos', productController.productList)

// ? Lista de Productos por Categpría
router.get('/categorias/:id', productController.getCategory)


// ? Detalle de Producto
router.get('/usuarios/:id/productos/:id', productController.productDetail)


// ? Agregar y actualizar producto
router.get('/usuarios/:userId/agregar-producto', onlyAuthMidleware, productController.addProductForm)
router.post('/usuarios/agregar-producto', upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'additional_images', maxCount: 3 }
]), validateAddProduct, productController.createProduct)

router.get('/usuarios/:userId/actualizar-producto/:productId', onlyAuthMidleware, productController.updateProductForm)
router.put('/usuarios/:userId/actualizar-producto/:productId', upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'additional_images', maxCount: 3 }
]), validateUpdateProduct, productController.updateProduct)

module.exports = router
const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController.js')
const onlyAuthMidleware = require('../middlewares/onlyAuthMiddleware.js')


// ? Lista de Productos
router.get('/productos', productController.productList)

// ? Lista de Productos por Categpría
router.get('/categorias/:id', productController.getCategory)


// ? Detalle de Producto
router.get('/usuarios/:id/productos/:id', productController.productDetail)


// ? Agregar y actualizar producto
router.get('/usuarios/:userId/agregar-producto', onlyAuthMidleware, productController.addProductForm)
router.post('/usuarios/agregar-producto', productController.createProduct)

router.get('/usuarios/:userId/actualizar-producto/:productId', onlyAuthMidleware, productController.updateProductForm)
router.put('/usuarios/:userId/actualizar-producto/:productId', productController.updateProduct)
module.exports = router
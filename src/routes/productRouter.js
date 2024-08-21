const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController.js')


// ? Lista de Productos
router.get('/productos', productController.productList)

// ? Lista de Productos por Categpría
router.get('/categorias/:id', productController.getCategory)


// ? Detalle de Producto
router.get('/usuarios/:id/productos/:id', productController.productDetail)


router.get('/usuarios/:id/agregar-producto', productController.addProductForm)

router.get('/usuarios/:id/actualizar-producto', productController.updateProductForm)

module.exports = router
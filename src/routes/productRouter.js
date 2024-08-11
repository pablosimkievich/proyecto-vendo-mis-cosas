const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController.js')


// ? Lista de Productos
router.get('/productos', productController.productList)

// ? Lista de Productos por Categpría
router.get('/categorias/:id', productController.getCategory)


// ? Detalle de Producto
router.get('/productos/:id', productController.productDetail)

module.exports = router
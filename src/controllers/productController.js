const db = require('../database/models/index')


const productList = async (req, res) => {
    try {

        const getAllProducts = await db.Product.findAll({
            include: [{
                association: 'users'
            }

            ],
            order: [
                ['id', 'DESC']
            ]
        })
        res.render('product/productList', { getAllProducts })

    } catch(error) {
        console.log(error)
    }
}


const getCategory = async (req, res) => {
    try {
        /* if(req.params.id > 16 || req.params.id < 1) {
            res.send(`No existe la categoría ${req.params.id}`)
        } */

        const id = req.params.id

        const getCategory = await db.Category.findByPk(id)

        const getCategoryProducts = await db.Product.findAll(
            {
                where: {
                    category_id: req.params.id
                },
                include: [
                    {
                        association: 'categories'
                    },
                    {
                        association: 'users'
                    }
                ]
            }
        )

        res.render('product/productByCategory', { getCategoryProducts, getCategory, id })

    } catch(error) {
        console.log(error)
    }
}

const productDetail = async (req, res) => {
    try {

        const id = req.params.id

        const product = await db.Product.findByPk( id, {
            include: [
                {
                    association: 'categories'
                },
                {
                    association: 'product_additional_images'
                },
                {
                    association: 'users'
                }
            ]
        })

        if(product) {
            const relatedProducts = await db.Product.findAll({
                where: {
                    category_id: product.category_id
                },
                limit: 4
            })
            console.log(( product ))
            res.render('product/productDetail', { product, relatedProducts } )
        } else {
            res.render('notFound404')
        }

    } catch(error) {
        console.log(error)
    }
}

const addProductForm = async (req, res) => {

    const categories = await db.Category.findAll()

    res.render('product/addProductForm', { categories })
}

const updateProductForm = async (req, res) => {

    const categories = await db.Category.findAll()

    const id = parseInt(req.params.productId)

    const product = await db.Product.findByPk(id, {
        include: [
            {
                association: 'product_additional_images'
            }
        ]
    })

    res.render('product/updateProductForm', { categories, product })
}


module.exports = {
    productList,
    getCategory,
    productDetail,
    addProductForm,
    updateProductForm
}
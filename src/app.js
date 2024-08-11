const express = require('express')
const app = express()
const path = require('path')

const mainRouter = require('./routes/mainRouter.js')
const productRouter = require('./routes/productRouter.js')
const userRouter = require('./routes/userRouter.js')

// middlewares

app.use(express.static(path.join(__dirname, "../public")))

app.set('view engine', 'ejs') // motor de plantillas
app.set('views', 'src/views') // carpeta de las vistas


// rutas

app.use('/', mainRouter)
app.use(productRouter)
app.use(userRouter)


// port y listen

const puerto = process.env.PORT || 3001;

app.listen(puerto, () => {
    console.log(`Servidor corriendo en puerto ${puerto}`)
})



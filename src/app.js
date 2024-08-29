const express = require('express')
const app = express()
const path = require('path')

const mainRouter = require('./routes/mainRouter.js')
const productRouter = require('./routes/productRouter.js')
const userRouter = require('./routes/userRouter.js')

const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware.js');

// middlewares

app.use(express.static(path.join(__dirname, "../public")))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false
}))
app.use(cookies());
app.use(userLoggedMiddleware);

app.set('view engine', 'ejs') // motor de plantillas
app.set('views', 'src/views') // carpeta de las vistas


// rutas

app.use('/', mainRouter)
app.use(productRouter)
app.use(userRouter)


// port, listen y 404 not found

app.use( (req, res, next) => {
    res.status(404).render('notFound404')
})

const puerto = process.env.PORT || 3001;

app.listen(puerto, () => {
    console.log(`Servidor corriendo en puerto ${puerto}`)
})



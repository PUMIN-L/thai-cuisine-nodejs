require('dotenv').config()

const express = require('express')
const cors = require('cors')
const limiter = require('./src/middlewares/rate-limit')
const notFoundMiddleware = require('./src/middlewares/not-found')
const errorMiddleware = require('./src/middlewares/error')
const authRouter = require('./src/routes/auth-route')
const productRouter = require('./src/routes/product-route')
const orderRouter = require('./src/routes/order-route')
const orderItemRouter = require('./src/routes/orderItem-route')

const app = express()

const port = process.env.PORT || 8288

app.use(cors())
app.use(limiter)
app.use(express.json())

app.use('/auth', authRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)
app.use('/orderItem', orderItemRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
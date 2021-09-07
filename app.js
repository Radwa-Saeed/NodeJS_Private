const express = require('express')
require("dotenv").config();
const connection = require('./config/configMongoDB');
const userRouter = require('./modules/users/routes/userRoutes');
const blogRouter = require('./modules/blogs/routes/blogRoutes');
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(blogRouter)
connection();
app.get('/', (req, res) => res.send('Hello World!')) //localhost:3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
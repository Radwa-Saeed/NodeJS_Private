const express = require('express')
require("dotenv").config();
const connection = require('./config/configMongoDB');
const userRouter = require('./modules/users/routes/userRoutes');
const blogRouter = require('./modules/blogs/routes/blogRoutes');
const app = express()
const port = process.env.PORT
const fs = require("fs")
app.use(express.json())
app.use(userRouter)
app.use(blogRouter)
app.use("/images",express.static('images'))
//app.use(express.static(path.join(__dirname, 'public')));
connection();
// app.get('/', (req, res) => res.send('Hello World!')) //localhost:5000
app.get('/', async(req, res) =>{
    res.writeHead(200,{'Content-Type':'text/html'})
    await fs.readFile('./html/index.html',(err,data)=>{
        if(err){
            res.writeHead(404)
            res.write('File Not Found')
        }
        else{
            res.write(data)
        }
        res.end();
    })
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

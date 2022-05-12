const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./src/db')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema');
const path = require('path');
const cookieParser = require('cookie-parser')


dotenv.config()

const app = express();

connectDB()

const port = 3000

app.use(cookieParser())

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src/templates/views'));


app.listen(port, ()=>{
    console.log(`Hello world listening at ${port}`)
})

//initialize routes
require("./src/routes")(app)


const user = {
    firstName: 'Hootie',
    lastName: 'Hubbell'
}

//creating routes
app.get('/', (req,res)=>{
    res.render("views/index", {user:user})
})

app.get('/home', (req,res)=>{
    res.render("views/home")
})

app.get('/profile', (req,res)=>{
    res.render("views/profile")
})

app.get('/login', (req,res)=>{
    res.render("views/login")
})

app.get('/register', (req,res)=>{
    res.render("views/register")
})


// //dynamic routes
// app.get('/:user/post', (req,res,next)=>{
//     console.log('Timestamp', Date())
//     next()
// },  ( req, res,next) =>{
//     res.send(req.params)
// })


app.use((req,res,next) =>{
    console.log('Timestamp', Date())
    next()
})

//accessing static files with middleware
app.use(express.static(path.join(__dirname, 'public')))

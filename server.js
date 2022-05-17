const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB } = require('./src/db')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')
const { authenticate } = require('./src/middleware/auth')
const cookieParser = require('cookie-parser')
const { userData } = require('./src/middleware/userData')

dotenv.config()

const app = express();

connectDB()

app.use(cookieParser())
app.use(authenticate)
app.use(userData)

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', (path.join(__dirname, '/src/templates/views')))

require('./src/routes')(app)

app.listen(process.env.PORT, ()=>{
    console.log(`Hello world app. listening at port ${process.env.PORT}`)
})
// const user = {
//     firstName: 'Hootie',
//     lastName: 'Hubbell'
// }

// //creating routes
// app.get('/', (req,res)=>{
//     res.render("views/index", {user:user})
// })

// app.get('/home', (req,res)=>{
//     res.render("views/home")
// })

// app.get('/profile', (req,res)=>{
//     res.render("views/profile")
// })

// app.get('/login', (req,res)=>{
//     res.render("views/login")
// })

// app.get('/register', (req,res)=>{
//     res.render("views/register")
// })


// //dynamic routes
// app.get('/:user/post', (req,res,next)=>{
//     console.log('Timestamp', Date())
//     next()
// },  ( req, res,next) =>{
//     res.send(req.params)
// })



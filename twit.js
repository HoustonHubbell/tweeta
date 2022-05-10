const express = require('express');
const path = require('path');
const app = express();
const port = 3000

app.listen(port, ()=>{
    console.log(`Hello world listening at ${port}`)
})

const user = {
    firstName: 'Hootie',
    lastName: 'Hubbell'
}

//creating routes
app.get('/', (req,res)=>{
    res.render("pages/index", {user:user})
})


app.get('/profile', (req,res)=>{
    res.render("pages/profile", {user:user})
})

app.get('/signin', (req,res)=>{
    res.render("pages/signin", {user:user})
})

//dynamic routes
app.get('/:user/post', (req,res,next)=>{
    console.log('Timestamp', Date())
    next()
},  ( req, res,next) =>{
    res.send(req.params)
})


app.use((req,res,next) =>{
    console.log('Timestamp', Date())
    next()
})

//accessing static files with middleware
app.use(express.static(path.join(__dirname, 'public')))

//setting templates
app.set('view engine', 'ejs')


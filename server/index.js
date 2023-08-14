const express = require('express')
const app = express()
const mongoose = require('mongoose')
const mainrouter = require("./routes/main")
const employeerouter = require("./routes/employee")
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require('connect-flash')
const cors = require('cors')

mongoose.connect('mongodb://127.0.0.1:27017/myapp')
.then(()=> console.log("connected to the database"))
.catch(err => console.log("connection failed"))

app.use(cors())
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }))
app.use(flash())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'));
app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});

app.use("/", mainrouter)
app.use("/employee", employeerouter)

app.set("views", __dirname+ '/views')

app.set("view engine", "ejs")

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> { 
    console.log(`listening on the port ${PORT}`)
})
//imports
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {sequelize} = require('./util/database')
const {PORT} = process.env


//models
const {Credential} = require('./models/credential')
const {User} = require('./models/user')
const {Category} = require('./models/category')
const {Expense} = require('./models/expense')
const {Income} = require('./models/income')


//middleware
const app = express()

//middleware
app.use(express.json())
app.use(cors())
const {isAuthenticated} = require('./middleware/isAuthenticated')

//functionality-controllers
const {register, login} = require('./controllers/auth')


// //db relationships --established in db table set up (ser>models)
// Credential.hasOne(User) //one-to-one user-password
// User.hasMany(Income) // one-to-many user-income
// User.hasMany(Expense) // one-to-many user-expense
// Expense.belongsTo(Category) // one-to-one expense-category

//routes - endpoints
app.post('/register', register)
app.post('/login',login)




// reinitializing DB, force true to restart the database if app redeployed
// ***will need reseeding if doing demo***
sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
    })
    .catch(err => console.log(err))

// //to drop tables
// sequelize.drop();
// console.log("All tables dropped!");
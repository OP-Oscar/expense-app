//imports
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {sequelize} = require('./util/database')
const {PORT} = process.env
const userController = require('./controllers/userController');

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

//controller-seed
const {seed} = require('./controllers/seed')
//controllers-auth
const {register, login} = require('./controllers/auth')
//controllers-functionality
const {getAllCategory, addExpense} = userController;

// //db relationships --established in db table set up (ser>models)
// Credential.hasOne(User) //one-to-one user-password
// User.hasMany(Income) // one-to-many user-income
// User.hasMany(Expense) // one-to-many user-expense
// Expense.belongsTo(Category) // one-to-one expense-category

//route -seed
app.post('/seed', seed)
//routes - endpoints
app.post('/register', register)
app.post('/login',login)
app.get(`/category`, getAllCategory)
app.post('/addexpense', addExpense)




// not reinitializing DB, force true added later if the app is deployed sequelize.sync({ force: true })
// ***will need reseeding if doing demo***
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
    })
    .catch(err => console.log(err))

// //to drop tables
// sequelize.drop();
// console.log("All tables dropped!");
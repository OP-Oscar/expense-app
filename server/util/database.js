//importing dotenv data
require('dotenv').config()

//importing connection string
const {CONNECTION_STRING} = process.env

//importing sequelize
const Sequelize = require('sequelize')

//db connection being set
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl:{
            rejectUnauthorized: false
        }
    }
})


//exporting our db
module.exports = {sequelize}
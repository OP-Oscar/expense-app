//sequelize data types
const {DataTypes} = require('sequelize')

//bringing in sequelize db connection
const {sequelize} = require('../util/database')

//creating table with sequelize
// https://sequelize.org/docs/v6/core-concepts/model-basics/

module.exports = {
    Category: sequelize.define('category', {

        category_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        category_name: DataTypes.STRING,
        category_description: DataTypes.TEXT
    },{
        freezeTableName: true
    }  )

}
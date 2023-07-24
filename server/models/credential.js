// NOT USED AT THE MOMENT --will be seperated with update //

//sequelize data types
const {DataTypes} = require('sequelize')

//bringing in sequelize db connection
const {sequelize} = require('../util/database')

//creating table with sequelize
// https://sequelize.org/docs/v6/core-concepts/model-basics/

module.exports = {
    Credential: sequelize.define('credential', {

        pw_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        hashed_pw: DataTypes.STRING
    },{
        freezeTableName: true
    }  )

}
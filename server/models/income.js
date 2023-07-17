//sequelize data types
const {DataTypes, Deferrable} = require('sequelize')

//bringing in sequelize db connection
const {sequelize} = require('../util/database')

//creating table with sequelize
// https://sequelize.org/docs/v6/core-concepts/model-basics/

module.exports = {
    Income: sequelize.define('income', {

        income_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        income_name: DataTypes.STRING,
        amount: DataTypes.DECIMAL,
        income_date: DataTypes.DATEONLY,
        user_id: {
            type: DataTypes.INTEGER,
            //establishing foreign key
            references: {
                //reference to credential model 
                model: 'user',
                //column name of the referenced model
                key: 'user_id',
                //immediately check the foreign key constraints
                deferrable: Deferrable.INITIALLY_DEFERRED
            }
        }

    },{
        freezeTableName: true
    }  )

}
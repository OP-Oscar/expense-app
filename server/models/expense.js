//sequelize data types
const {DataTypes, Deferrable} = require('sequelize')

//bringing in sequelize db connection
const {sequelize} = require('../util/database')

//creating table with sequelize
// https://sequelize.org/docs/v6/core-concepts/model-basics/

module.exports = {
    Expense: sequelize.define('expense', {

        expense_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        expense_name: DataTypes.STRING,
        amount: DataTypes.DECIMAL,
        expense_date: DataTypes.DATEONLY,
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
        },
        category_id: {
            type: DataTypes.INTEGER,
            //establishing foreign key
            references: {
                //reference to credential model 
                model: 'category',
                //column name of the referenced model
                key: 'category_id',
                //immediately check the foreign key constraints
                deferrable: Deferrable.INITIALLY_DEFERRED
            }
        }

    },{
        freezeTableName: true
    }  )

}
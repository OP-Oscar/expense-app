//sequelize data types
const {DataTypes, Deferrable} = require('sequelize')

//bringing in sequelize db connection
const {sequelize} = require('../util/database')

//creating table with sequelize
// https://sequelize.org/docs/v6/core-concepts/model-basics/

module.exports = {
    User: sequelize.define('user', {

        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true},
        f_name: DataTypes.STRING,
        l_name: DataTypes.STRING,
        pw_id: {
            type: DataTypes.INTEGER,
            //establishing foreign key
            references: {
                //reference to credential model 
                model: 'credential',
                //column name of the referenced model
                key: 'pw_id',
                //immediately check the foreign key constraints
                // deferrable: Deferrable.NOT
            }
        }

    },{
        freezeTableName: true
    } )

}
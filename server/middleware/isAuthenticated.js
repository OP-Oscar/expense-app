//import
require("dotenv").config();
//jwt for sessions
const jwt = require("jsonwebtoken");
//secret variable, for session.
const { SECRET } = process.env;


//method to export components
module.exports = { 
    //function which has request, response, and a third variable called "next"
    isAuthenticated: (req, res, next) => { 
        //confirming authorization as 'headertoken'
        const headerToken = req.get('Authorization') 

        //if no headerToken found return error
        if (!headerToken) { 
            console.log('Error In ser>middle>isauth')
            res.sendStatus(401)
        }
        //assuming headertoken was found, we proceed to make variable
        let token

        //create variable which uses jwt to check if there is a match
        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        //if token is not a match then return message stating not authenticated
        if (!token) {
            const error = new Error('Not Authenticated')
            error.statusCode = 401
            throw error
        }

        //random function which unsure what it will do later
        next()
    }
}

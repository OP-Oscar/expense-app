//import
require("dotenv").config();
//brcypt for encryption
const bcrypt = require("bcryptjs");
//jwt for sessions
const jwt = require("jsonwebtoken");
//secret variable, for session.
const { SECRET } = process.env;

//pulling db which we will use for comparison
const { User } = require("../models/user");
const { Credential } = require("../models/credential");

//function for creating session token
function createToken(username, id) {
  return jwt.sign(
    {
      username,
      user_id,
    },
    SECRET,
    {
      expiresIn: "2 days",
    }
  );
}

module.exports = {
  //function to register new users
  register: async (req, res) => {
    try {
      //grabbing user info from front end form to register
      const { username, f_name, l_name, password } = req.body;
      //confirming if user exists in User table
      let foundUser = await User.findOne({ where: { username } });
      //conditional statement based if username is found
      if (foundUser) {
        //since username found, returning message
        res.status(400).send(`Cannot create user, try a different username`);
      } else {
        //salt lvl
        const salt = brcypt.genSaltSync(10);
        //hashed pw
        const hash = bcrypt.hashSync(password, salt);
        //creating new user entry in user table
        const newUser = await User.create({ username, f_name, l_name });
        //creating new pw entry in credential table
        const newPw = await Credential.create({ hashed_pw: hash });
        //creating session token
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.user_id
        );
        console.log("Token created: ", token);
        //token expiration variable (ms*sec*min*hr)
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        //sending response
        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.user_id,
          token,
          exp,
        });
      }
      //catch error in register function
    } catch (error) {
      //catching error and responding 400
      console.log(`Error in ser>con>auth>register`);
      console.log(error);
      res.sendStatus(400);
    }
  },

  //function to login
  login: async (req, res) => {
    try {
      //receiving username,password from frontend
      const { username, password } = req.body;
      //checking of username exists
      let foundUser = await User.findOne({ where: { username } });
      //retrieving hashed pw for reference
      let pwRef = await Credential.findOne({
        where: { pw_id: foundUser.dataValues.pw_id },
      });
      //conditional statement based if username is found
      if (foundUser) {
        //confirming password match
        const isAuthenticated = bcrypt.compareSync(
          password,
          pwRef.dataValues.hashed_pw
        );
        if (isAuthenticated) {
          //if authenticated successful, create token
          const token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.user_id
          );
          //token expiration variable (ms*sec*min*hr)
          const exp = Date.now() + 1000 * 60 * 60 * 48;
          //sending response
          res.status(200).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.user_id,
            token,
            exp,
          });
        } else {
          //returning 400 if password submitted was incorrect
          res.status(400).send("Unsuccessful Log In--pw");
        }
      } else {
        //returning 400 if user was not found
        res.status(400).send("Unsuccessful Log In--user");
      }
      //catch error in login function
    } catch (error) {
      //catching error and responding 400
      console.log(`Error in ser>con>auth>login`);
      console.log(error);
      res.sendStatus(400);
    }
  },
};

// let foundUser22 = User.findOne({where: {username: 'eggs'}})
// console.log(foundUser22)

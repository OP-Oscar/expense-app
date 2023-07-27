//pulling db which we will use for comparison
const { Category } = require("../models/category");
const { Income } = require("../models/income");


module.exports = {
  //function to register new users
  getAllCategory: async (req, res) => {
    try {
        const categories = await Category.findAll()
        res.status(200).send(categories)
    }//catch error in register function 
    catch (error) {
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>getcategory`);
      console.log(error);
      res.sendStatus(400);
    }
  },

  getAllIncome: async (req, res) => {
    try {
        const {userId} = req.params
        const incomes = await Income.findAll({
          where: {user_id: userId}
        })
        res.status(200).send(incomes)
    }//catch error in register function 
    catch (error) {
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>getincome`);
      console.log(error);
      res.sendStatus(400);
    }
  },
  
  addExpense: async (req, res) => {
    try {
      const {expense_name, amount, expense_date, category_id, user_id} = req.body
      console.log(expense_name, amount, expense_date, category_id, user_id)
      res.status(200).send("we got expenses...")
    }//catch error in register function 
    catch (error) {
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>addexpense`);
      console.log(error);
      res.sendStatus(400);
    }
  },

  addIncome: async (req, res) => {
    try {
      const {income_name, amount, income_date, user_id} = req.body
      console.log(income_name, amount, income_date, user_id)
      res.status(200).send("we got income...")
    }//catch error in register function 
    catch (error) {
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>addincome`);
      console.log(error);
      res.sendStatus(400);
    }
  },

};


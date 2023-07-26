//pulling db which we will use for comparison
const { Category } = require("../models/category");



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
  
};


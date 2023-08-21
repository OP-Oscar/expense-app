//pulling db which we will use for comparison
const { Category } = require("../models/category");
const { Income } = require("../models/income");
const { Expense } = require("../models/expense");
const { sequelize } = require("../util/database");

module.exports = {
  //function to register new users
  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.status(200).send(categories);
    } catch (error) {
      //catch error in register function
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>getcategory`);
      console.log(error);
      res.sendStatus(400);
    }
  },

  getAllIncome: async (req, res) => {
    try {
      const { userId } = req.params;
      const incomes = await Income.findAll({
        where: { user_id: userId },
      });
      res.status(200).send(incomes);
    } catch (error) {
      //catch error in register function
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>getincome`);
      console.log(error);
      res.sendStatus(400);
    }
  },

  getAllExpense: async (req, res) => {
    try {
      const { userId } = req.params;
      const expenses = await Expense.findAll({
        where: { user_id: userId },
      });
      res.status(200).send('successful getting expense');
    } catch (error) {
      //catch error in register function
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>getexpense`);
      console.log(error);
      res.sendStatus(400);
    }
  },

  getAllExpenseWithCat: async (req, res) => {
    try {
      const { userId } = req.params;
      let customQuery = `
      select *
      from expense
      left join category 
      on category.category_id = expense.category_id
      where user_id = ${userId}      
      `
      sequelize
        .query(customQuery)
        .then((dbRes) => {
          console.log(dbRes[0])
          res.status(200).send(dbRes[0])});
    } catch (error) {
      //catch error in register function
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>getexpense`);
      console.log(error);
      res.sendStatus(400);
    }
  },

  getAllTransactions: async (req, res) => {
    try {
      const { userId } = req.params;
      let customQuery = `
      select 
        user_id,
        name,
        date,
        amount,
        id,
        SUM(CASE WHEN split_part(id, '-', 2) = 'exp' THEN -amount ELSE amount END) over (order by date, split_part(id, '-', 1)::integer ) AS balance
      from
        (select income_name as name, amount, income_date as date, user_id, concat(income_id, '-inc') as id
        from income where user_id = ${userId}
        union
        select expense_name as name, amount, expense_date as date, user_id, concat(expense_id, '-exp') as id
        from expense where user_id = ${userId}) as T1
      order by date desc, split_part(id, '-', 1)::integer desc
      `;
      sequelize
        .query(customQuery)
        .then((dbRes) => res.status(200).send(dbRes[0]));
    } catch (error) {
      //catch error in register function
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>transactions`);
      console.log(error);
      res.sendStatus(400);
    }
  },

  addExpense: async (req, res) => {
    try {
      const { expense_name, amount, expense_date, category_id, user_id } =
        req.body;
      await Expense.create({ expense_name, amount, expense_date, user_id, category_id});
      res.status(200).send("Expense Added Successfully");
    } catch (error) {
      //catch error in register function
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>addexpense`);
      console.log(error);
      res.sendStatus(400);
    }
  },

  addIncome: async (req, res) => {
    try {
      const { income_name, amount, income_date, user_id } = req.body;
      await Income.create({ income_name, amount, income_date, user_id});
      res.status(200).send("Income Added Successfully");
    } catch (error) {
      //catch error in register function
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>addincome`);
      console.log(error);
      res.sendStatus(400);
    }
  },

  deleteTransaction: async (req, res) => {
    try {
      const {id} = req.params;
      {id.slice(-3) === 'exp' ? 
      await Expense.destroy({where: {expense_id: +id.split('-',1).join()}}):
      await Income.destroy({where: {income_id: +id.split('-',1).join()}})}
      res.status(200).send("Transaction Deleted Successfully");
    } catch (error) {
      //catch error in register function
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>delete`);
      console.log(error);
      res.sendStatus(400);
    }
  },


};

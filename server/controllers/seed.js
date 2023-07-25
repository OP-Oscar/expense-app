//bringing in sequelize db connection
const {sequelize} = require('../util/database')
//module to generate random text
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

//models
const {Category} = require('../models/category')
const {Credential} = require('../models/credential')
const {User} = require('../models/user')
const {Income} = require('../models/income')
const {Expense} = require('../models/expense')


//sample data to insert
const categoryToInsert = [
    {
        category_name: "Housing",
        category_description: "Expenses related to living space but not including utilities if utilities are paid separately. "
    }, 
    {
        category_name: "Transportation",
        category_description: "Expenses related to transportation. Include any repairs related to transportation here."
    },
    {
        category_name: "Food",
        category_description: "Expenses related to food. This would include eating out or normal grocery expenses."
    },
    {
        category_name: "Utilities",
        category_description: "Expenses related to utilities such as electricity, gas, water, trash, etc. If this expense was bundled in Housing expense, then no need to add here too."
    },
    {
        category_name: "Medical & HealthCare",
        category_description: "Expenses related to healthcare such as but not limited to, health insurance, doctor visits, medicines, and/or over the counter medicines. "
    },
    {
        category_name: "Saving & Investing",
        category_description: "Expense is related to any amount you are saving or investing. This would include any fees associated to those accounts as well if any. "
    },
    {
        category_name: "Recreation, & Entertainment",
        category_description: "Expenses related to any optional activities for entertainment and/or recreation. Vacation expenses can be included here. "
    },
    {
        category_name: "Personal Expenses",
        category_description: "Expenses related to personal needs such as but not limited to clothing, tools, cookware, shoes, etc. "
    },
    {
        category_name: "Miscellaneous",
        category_description: "Expenses that did not fit other categories can go here. "
    },
];

const credentialToInsert = [
    {   //testuser1
        hashed_pw: '$2a$10$P3BkR5BRn3/Ckil9p1v/kec75D03cAjfjCHpmVcVZ2UHuCBFEZRYK'
    },
    {   //testuser2
        hashed_pw: '$2y$10$7ebsU1va8LKD8YJXwznb/usXsTtWNWH1gKfzKQR5gShmaHt8dLCCm'
    },
    {   //testuser3
        hashed_pw: '$2y$10$F2OVa9.eLWgVzD83of3AhuqVDIsA/wYKc79t1r7OiZCSKjgPJPVPy'
    },
];

const userToInsert = [
    {   //testuser1
        username: 'testuser',
        f_name: 'Luke',
        l_name: 'Skywalker',
        pw_id: 1
    },
    {   //testuser2
        username: 'testuser2',
        f_name: 'Austin',
        l_name: 'Powers',
        pw_id: 2
    },
    {   //testuser3
        username: 'testuser3',
        f_name: 'Lloyd',
        l_name: 'Christmas',
        pw_id: 3
    },
];


//function to use lorem module
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });
  
  lorem.generateWords(1);

//function to generate dates within 2-month timeframe
const today = new Date()
const pastDay = new Date(new Date().setDate(today.getDate() - 60))
const startDate = pastDay.toISOString().split('T')[0]
const endDate = today.toISOString().split('T')[0];

// Calculate the number of days between the start and end dates
const daysInRange = Math.floor((new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;

// Generate random expense data for each day within the 2-month timeframe
const expensesToInsert = [];
for (let i = 0; i < 60; i++) {
  const randomDate = new Date(startDate);
  randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * daysInRange));
  //function to generate random decimal numbers
  const randomAmount = (min, max) => +(Math.random() * (max - min) + min).toFixed(2);
  //function to generate random word
  const randomWord = lorem.generateWords(1);

  const randomId= (min, max) => {return Math.floor(Math.random() * (max - min + 1)) + min;}

  //pushing entries to empty expensesToInsert list
  expensesToInsert.push({
    expense_name: randomWord,
    amount: randomAmount(1,200),
    expense_date: new Date(randomDate),
    user_id: randomId(1,3), 
    category_id: randomId(1,9),
  });
}

const incomeToInsert = [
    {
        income_name: 'job',
        amount: 1000,
        income_date: new Date(new Date().setDate(today.getDate() - 60)),
        user_id: 1
    }, 
    {
        income_name: 'job',
        amount: 1200,
        income_date: new Date(new Date().setDate(today.getDate() - 60)),
        user_id: 2
    }, 
    {
        income_name: 'job',
        amount: 1300,
        income_date: new Date(new Date().setDate(today.getDate() - 60)),
        user_id: 3
    },
    {
        income_name: 'job',
        amount: 1000,
        income_date: new Date(new Date().setDate(today.getDate() - 30)),
        user_id: 1
    }, 
    {
        income_name: 'job',
        amount: 1200,
        income_date: new Date(new Date().setDate(today.getDate() - 30)),
        user_id: 2
    }, 
    {
        income_name: 'job',
        amount: 1300,
        income_date: new Date(new Date().setDate(today.getDate() - 30)),
        user_id: 3
    }, 
]

//sequelize doc to rev
//https://sequelize.org/docs/v6/other-topics/transactions/

//seed function which will be exported
module.exports = {
    seed: async (req, res) => {
        //insert data to category table
        await Category.bulkCreate(categoryToInsert)
        //insert data to credential table
        await Credential.bulkCreate(credentialToInsert)
        //insert data to user table
        await User.bulkCreate(userToInsert)
        //insert data to income table
        await Income.bulkCreate(incomeToInsert)
        //insert data to expense table
        await Expense.bulkCreate(expensesToInsert) 

        .then(() => {
            console.log('DB Successfully seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('Error Seeding DB', err));
    }
}
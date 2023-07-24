//bringing in sequelize db connection
const {sequelize} = require('../util/database')

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

const incomeToInsert = [{}]

const expenseToInsert = [{}]


module.exports = {
    seed: async (req, res) => {
        await Category.bulkCreate(categoryToInsert)
        
        await Credential.bulkCreate(credentialToInsert)
        
        await User.bulkCreate(userToInsert)

        // await Income.bulkCreate(incomeToInsert) //=>pending

        // await Expense.bulkCreate(expenseToInsert) //=>pending

        .then(() => {
            console.log('DB Successfully seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('Error Seeding DB', err));
    }
}
//pulling db which we will use for comparison
const { Category } = require("../models/category");



module.exports = {
  //function to register new users
  getAllCategory: async (req, res) => {
    try {
        const categories = await Category.findAll()
        console.log(categories)
        res.status(200).send(categories)
    }//catch error in register function 
    catch (error) {
      //catching error and responding 400
      console.log(`Error in ser>con>usercontroller>getcategory`);
      console.log(error);
      res.sendStatus(400);
    }
  },

  
};


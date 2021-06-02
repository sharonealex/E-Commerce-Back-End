const { Category } = require('../models');

const categoryValues = [
    {
      category_name: 'Mens Clothing',
    },
    {
      category_name: 'Womens Clothing',
    },
    {
      category_name: 'Gadgets',
    },
    {
      category_name: 'Home Living',
    },
    {
      category_name: 'Books',
    },
  ];

  const seedCategory = function(){
      Category.bulkCreate(categoryValues)
  }

  module.exports = seedCategory;
const { Category } = require('../models');

const categoryValues = [
    {
      category_name: 'Mens Clothing',
    },
    {
      category_name: 'Womens Clothing',
    },
    {
      category_name: 'Sports',
    },
    {
      category_name: 'Home Living',
    },
    {
      category_name: 'Car Accessories',
    },
  ];

  const seedCategory = function(){
      Category.bulkCreate(categoryValues)
  }

  module.exports = seedCategory;
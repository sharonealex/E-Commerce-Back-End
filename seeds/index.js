const sequelize = require('../config/connection');
const seedCategories = require('./category');
const seedProducts = require('./product');
const seedTags = require('./tag');
const seedProductTags = require('./product_tag');




const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');
  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');
  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');
  await seedProductTags();
  console.log('\n----- PRODUCT_TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
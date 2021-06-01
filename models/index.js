
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//Products  belong to Category      


// Category - Product is One - Many

Product.belongsTo(Category, {
    foreignKey: 'category_id'
});



// Categories has Many Products.

Category.hasMany(Product, {
    foreignKey: 'category_id'
})


//Product - Tags - Many to Many

Product.belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: 'tag_id'
})
//Products can have tags. Product belongs to Tags


Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'product_id'
})
//Tags have many products linked to it.

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
  };
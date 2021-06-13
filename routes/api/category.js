const router = require('express').Router();
const { Category, Product } = require('../../models');

// api endpoints for category

//fetch all categories and the products within them.
router.get('/', (request, response) => {
    Category.findAll(
        {
          include: {
            model: Product,
            attributes: ['product_name']
          }
        }
      )
        .then(categoryData => response.json(categoryData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });
    


module.exports = router;

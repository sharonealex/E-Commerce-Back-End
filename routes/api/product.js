const router = require('express').Router();
const { Category, Product } = require('../../models');

// api endpoints for products

// create a new product
router.post('/', (request, response) => {
    Product.create({
      product_name: request.body.product_name
    })
      .then(productData => response.json(productData))
      .catch(err => {
        console.log(err);
        response.status(500).json(err);
      });
  });

//fetch all products 
router.get('/', (request, response) => {
    Product.findAll()
        .then(productData => response.json(productData))
        .catch(err => {
          console.log(err);
          response.status(500).json(err);
        });
    });

//fetch product by id and the products within them.
    
    router.get('/:id', (request, response) => {
        Product.findOne({
          where: {
            id: request.params.id
          }
        })
          .then(productData => response.json(productData))
          .catch(err => {
            console.log(err);
            response.status(500).json(err);
          });
      });

//  update an existing product
router.put('/:id', (request, response) => {
    Product.update(
      {
        category_name: request.body.product_name
      },
      {
        where: {
          id: request.params.id
        }
      })
      .then(productData => {
          console.log(productData)
        if (!productData) {
            response.status(404).json({ message: 'No Product available with provided ID.' });
          return;
        }
        response.json(productData);
      })
      .catch(err => {
        console.log(err);
        response.status(500).json(err);
      });
  });

  //Delete a category and associated products that belong to this category.
  router.delete('/:id', (request, response) => {
    Product.destroy({
      where: {
        id: request.params.id
      }
    })
      .then(productData => {
        if (!productData) {
            response.status(404).json({ message: 'No Category  available with provided ID.' });
          return;
        }
        response.json(productData);
      })
      .catch(err => {
        console.log(err);
        response.status(500).json(err);
      });
  });
  
          
    


module.exports = router;

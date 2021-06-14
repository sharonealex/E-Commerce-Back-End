const router = require('express').Router();
const { Category, Product } = require('../../models');

// api endpoints for category

// create a new category
router.post('/', (request, response) => {
    Category.create({
      category_name: request.body.category_name
    })
      .then(categoryData => response.json(categoryData))
      .catch(err => {
        console.log(err);
        response.status(500).json(err);
      });
  });

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

//fetch category by id and the products within them.
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
    
    router.get('/:id', (request, response) => {
        Category.findOne({
          where: {
            id: request.params.id
          },
          include: {
            model: Product,
            attributes: ['category_id', 'product_name']
          }
        })
          .then(categoryData => response.json(categoryData))
          .catch(err => {
            console.log(err);
            response.status(500).json(err);
          });
      });

      // PUT update a category
router.put('/:id', (request, response) => {
    Category.update(
      {
        category_name: request.body.category_name
      },
      {
        where: {
          id: request.params.id
        }
      })
      .then(categoryData => {
          console.log(categoryData)
        if (!categoryData) {
            response.status(404).json({ message: 'No Category found with that ID.' });
          return;
        }
        response.json(categoryData);
      })
      .catch(err => {
        console.log(err);
        response.status(500).json(err);
      });
  });

  router.delete('/:id', (request, response) => {
    Category.destroy({
      where: {
        id: request.params.id
      },
      include: {
        model: Product
      }
    })
      .then(categoryData => {
        if (!categoryData) {
            response.status(404).json({ message: 'No Category found with that ID.' });
          return;
        }
        response.json(categoryData);
      })
      .catch(err => {
        console.log(err);
        response.status(500).json(err);
      });
  });
  
          
    


module.exports = router;

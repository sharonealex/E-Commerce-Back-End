const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// api endpoints for products

// create a new product
router.post('/', (request, response) => {
    Product.create(
     request.body
    )
    .then((product) => {
      // create mappings to bulk create in the ProductTag model, if there's product tags exists
      if (request.body.tagIds.length) {
        const productTagList = request.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagList);
      }
      res.status(200).json(product);
    })
      .then(productData => response.json(productData))
      .catch(err => {
        console.log(err);
        response.status(500).json(err);
      });
  });

//fetch all products 
router.get('/', (request, response) => {
    Product.findAll({
        include: [
            {
              model: Category,
              attributes: ["category_name"],
            },
            {
              model: Tag,
              attributes: ["tag_name"],
            },
          ],
    }
        
    )
        .then(productData => response.json(productData))
        .catch(err => {
          console.log(err);
          response.status(500).json(err);
        });
    });

//fetch product by id and the products within them.
    
    router.get('/:id', (request, response) => 
    {
        Product.findOne(
            {
          where: {
            id: request.params.id
          },
          
            include: [
                {
                  model: Category,
                  attributes: ["category_name"],
                },
                {
                  model: Tag,
                  attributes: ["tag_name"],
                },
              ]
        
        })
          .then(productData => response.json(productData))
          .catch(err => {
            console.log(err);
            response.status(500).json(err);
          });
        });
      
    

//  update an existing product
router.put("/:id", (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});


  //Delete a category and associated products that belong to this category.
  router.delete("/:id", (req, res) => {
    // delete one product by its `id` value
    Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((product) => {
        if (!product) {
          res.status(404).json({ message: "No product found with this ID" });
          return;
        }
  
        res.json(product);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
          
    


module.exports = router;

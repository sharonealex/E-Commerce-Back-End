const router = require('express').Router();
const { Category, Product } = require('../../models');

// api endpoints for category

//fetch all categories and the products within them.
router.get('/', (request, response)=>{

    Category.findAll(
         {
      include: {
        model: Product
      }
    }

    )
    .then((category)=>{
response.json(category)
    })
    .catch((err)=>{
        response.status(500).json(err)
    })
})


module.exports = router;

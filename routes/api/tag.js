const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

//get all tags and associated products m:n

router.get("/", (req, res) => {

  Tag.findAll({
    include: [
      {
        model: Product,
       // attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((tags) => res.json(tags))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
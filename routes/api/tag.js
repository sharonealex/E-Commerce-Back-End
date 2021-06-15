const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

//create
router.post("/", (req, res) => {
    Tag.create({
      tag_name: req.body.tag_name,
    })
      .then((tag) => res.json(tag))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

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

router.get("/:id", (req, res) => {
    Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product
        },
      ],
    })
      .then((tag) => res.json(tag))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.put("/:id", (req, res) => {
   
    Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((tag) => {
        if (!tag) {
          res.status(404).json({ message: "No Tag found with provided ID." });
          return;
        }
        res.json(tag);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

module.exports = router;
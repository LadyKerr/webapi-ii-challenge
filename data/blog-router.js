const express = require("express");

const DB = require("./db");

const router = express.Router();

router.use(express.json());

//display all posts
router.get("/", (req, res) => {
  DB.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "The post information could not be retrieved." });
    });
});

//display posts by their ids
router.get("/:id", (req, res) => {
  const { id } = req.params;

  DB.findById(id)
    .then(post => {
      if (post && post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(400)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

module.exports = router;

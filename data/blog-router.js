//import express
const express = require("express");

//import data
const DB = require("./db");

//import express router
const router = express.Router();

//parse json data
router.use(express.json());

//************ C-R-U-D **********

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

//display comments by specified post id
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  DB.findCommentById(id)
    .then(postComment => {
      if (postComment && postComment.length) {
        res.status(200).json(postComment);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The post information could not be retrieved." });
    });
});

module.exports = router;

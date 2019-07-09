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

//add new blog post
router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    DB.insert(req.body)
      .then(newPost => {
        res.status(201).json(newPost);
      })
      .catch(err => {
        res.status(500).json({
          eror: "There was an error while saving the post to the database."
        });
      });
  }
});

//add new comment to specified post ID
// router.post("/:id/comments", (req, res) => {
//   const { text } = req.body;
//   const { id } = req.params.id;

//   if (!id) {
//     res
//       .status(404)
//       .json({ message: "The post with the specified ID does not exist." });
//   } else if (!text) {
//     res
//       .status(400)
//       .json({ errorMessage: "Please provide text for the comment." });
//   } else {
//     DB.insertComment(req.body)
//       .then(comment => {
//         res.status(201).json(comment);
//       })
//       .catch(err => {
//         res.status(500).json({
//           message:
//             "There was an error while saving the comment to the database."
//         });
//       });
//   }
// });

//delete post by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  DB.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed." });
    });
});

//update posts
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const { title, contents } = req.body;

  DB.update(id, changes)
    .then(updated => {
      if (!updated) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (!title || !contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        res.status(200).json(updated);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be modified" });
    });
});

module.exports = router;

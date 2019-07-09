const express = require("express");

const blogRouter = require("./data/blog-router.js");

const server = express();
server.use("/api/posts", blogRouter);

//server running
const port = 8000;
server.listen(port, () =>
  console.log(`\n*** server is running on port ${port} *** \n`)
);

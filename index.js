const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const blogRouter = require("./data/blog-router.js");

const server = express();
server.use("/api/posts", blogRouter);

//server running
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n*** server is running on http://localhost:${port} *** \n`)
);

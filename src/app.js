const express = require("express");
const cors = require("cors");
const {
  getPosts,
  deletePost,
  createPost,
  editPost,
} = require("./controllers/post-controller");
const { error } = require("./middlewares/error-middleware");
const connect = require("./mongodb/mongodb.connect");

connect();
const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/get-posts", getPosts);
app.post("/create-post", createPost);
app.delete("/delete-post/:id", deletePost);
app.put("/edit-post/:id", editPost);

app.use(error);

app.listen(PORT, () => console.log(`server listening on ${PORT}`));

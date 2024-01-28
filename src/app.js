require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  getPosts,
  deletePost,
  createPost,
  editPost,
  comment,
  deleteComment,
} = require("./controllers/post-controller");
const { register, login } = require("./controllers/authentication-controller");
const { error } = require("./middlewares/error-middleware");
const connect = require("./mongodb/mongodb.connect");

connect();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", register);
app.post("/api/login", login);
app.get("/api/get-posts", getPosts);
app.post("/api/create-post", createPost);
app.delete("/api/delete-post/:id", deletePost);
app.put("/api/edit-post/:id", editPost);
app.post("/api/comment-post/:id", comment);
app.delete("/api/delete-comment/:postId/:commentId", deleteComment);

app.use(error);

app.listen(PORT, () => console.log(`server listening on ${PORT}`));

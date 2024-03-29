const PostModel = require("../model/post.model");
const { nanoid } = require("nanoid");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find().sort({ dateCreated: -1 });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    if (!req.body.message) {
      let error = new Error("please provide a message");
      error.statusCode = 400;
      next(error);
      return;
    }
    const post = {
      name: req.body.name,
      message: req.body.message,
      dateCreated: new Date(),
      dateModified: new Date(),
      comments: [],
    };
    const newPost = await PostModel.create(post);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      let error = new Error("Invalid id");
      error.statusCode = 400;
      next(error);
      return;
    }
    const deleted = await PostModel.findOneAndDelete({ _id: id });
    if (!deleted) {
      let error = new Error("Not found post");
      error.statusCode = 400;
      next(error);
      return;
    }
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
};

exports.editPost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const editedPost = req.body;
    if (!id) {
      let error = new Error("Invalid id");
      error.statusCode = 400;
      next(error);
      return;
    }
    if (!editedPost) {
      let error = new Error("Invalid body");
      error.statusCode = 400;
      next(error);
      return;
    }
    const newEditedPost = await PostModel.findOneAndUpdate(
      { _id: id },
      { ...editedPost, dateModified: new Date() },
      { returnDocument: "after" }
    );
    res.status(200).json(newEditedPost);
  } catch (err) {
    next(err);
  }
};

exports.comment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = req.body;
    if (!comment) {
      let error = new Error("Failed comment");
      error.statusCode = 400;
      return next(error);
    }
    comment.dateCreated = new Date();
    comment.id = nanoid();
    const foundPost = await PostModel.findById(id);
    foundPost.comments.push(comment);
    await foundPost.save();
    res.status(201).json(comment);
  } catch (err) {}
};

exports.deleteComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const foundPost = await PostModel.findById(postId);
    if (!foundPost) {
      let error = new Error("Post not found");
      error.statusCode = 400;
      return next(error);
    }
    foundPost.comments = foundPost.comments.filter(
      (comment) => comment.id != commentId
    );
    await foundPost.save();
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    next(err);
  }
};

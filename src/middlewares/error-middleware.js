exports.error = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json(err.message);
};

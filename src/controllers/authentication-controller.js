const AuthenticationModel = require("../model/authentication.model");

exports.register = async (req, res, next) => {
  try {
    const user = await AuthenticationModel.findOne({
      id: req.body.id,
    });
    if (user) {
      let error = new Error("This id is already used");
      error.statusCode = 400;
      return next(error);
    }
    const registeredUser = {
      id: req.body.id,
      name: req.body.name,
      password: req.body.password,
    };
    const newUser = await AuthenticationModel.create(registeredUser);
    delete newUser.password;
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const foundUser = await AuthenticationModel.findOne({ id: req.body.id });
    if (!foundUser) {
      let error = new Error("Login failed");
      error.statusCode = 400;
      return next(error);
    }
    if (foundUser.password != req.body.password) {
      let error = new Error("Login failed");
      error.statusCode = 400;
      return next(error);
    }
    delete foundUser.password;
    res.status(200).json(foundUser);
  } catch (err) {
    next(err);
  }
};

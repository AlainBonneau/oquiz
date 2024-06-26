const { User } = require("../models");

const addSessionUser = async (req, res, next) => {
  const userId = req.session.user;
  console.log("userId = ", userId);
  if (!userId) {
    res.locals.user = null;
    return next();
  }

  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });
  res.locals.user = user;

  next();
};

module.exports = addSessionUser;

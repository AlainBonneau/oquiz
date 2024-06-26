const { Tag } = require("../models");

const tagController = {
  async renderTagPage(req, res) {
    try {
      const tags = await Tag.findAll({ include: "quizzes" });
      res.render("tag", { tags });
    } catch (error) {
      console.error(error);
      res.status(500).send("Une erreur s'est produite");
    }
  },
};

module.exports = tagController;

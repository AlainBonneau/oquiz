const { Quiz } = require("../models");

const mainController = {
  async renderHomePage(req, res) {
    try {
      const quizzes = await Quiz.findAll({
        include: ["author", "tags"],
        order: [["title", "ASC"]],
      });
      res.render("home", { quizzes });
    } catch (error) {
      console.error(error);
      res.status(500).send("Une erreur s'est produite");
    }
  },
};

module.exports = mainController;

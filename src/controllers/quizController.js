const { Quiz, Question } = require("../models");
const computeScore = require("../lib/computeScore");

const quizController = {
  async renderQuizPage(req, res) {
    try {
      // Je récupère l'id du quiz demandé
      const quizId = parseInt(req.params.id);
      const quiz = await Quiz.findByPk(quizId, {
        include: [
          "author",
          "tags",
          { association: "questions", include: ["level", "propositions"] },
        ],
      });
      res.render("quiz", { quiz });
    } catch (error) {
      console.error(error);
      res.status(500).send("Une erreur s'est produite");
    }
  },

  async renderQuizResultPage(req, res) {
    const quizId = parseInt(req.params.id);
    const questions = await Question.findAll({
      where: { quiz_id: quizId },
      attributes: ["id", "answer_id"],
    });

    const { score, nbOfQuestions } = computeScore(questions, req.body);

    res.render("quiz-result", { score, nbOfQuestions });
  },
};

module.exports = quizController;

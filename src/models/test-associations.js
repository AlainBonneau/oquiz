const { Question, Level, Quiz, User, Tag, Answer } = require("./associations");

main();

async function main() {
  // Récupérer une QUESTION et inclure son LEVEL
  const question3 = await Question.findByPk(3, { include: "level" }); // on utilise l'alias !
  console.log(question3.toJSON());

  // Récupérer un LEVEL et inclure ses QUESTIONS
  const level1 = await Level.findByPk(1, { include: "questions" });
  console.log(level1.toJSON());

  // Récupérer un quiz avec toutes ses QUESTION
  const quiz1 = await Quiz.findByPk(1, { include: "questions" });
  console.log(quiz1.toJSON());

  // Récupérer une question et savoir de quel quiz il provient
  const question5 = await Question.findByPk(5, { include: "quiz" });
  console.log(question5.toJSON());

  // Récupérer Chuck et inclure les quizzes qu'il a créé
  const chuck = await User.findOne({
    where: { firstname: "Chuck" },
    include: "quizzes"
  });
  console.log(chuck.toJSON());

  // Récupérer tous les quizzes accompagnés de leur author
  const allQuizzes = await Quiz.findAll({ include: "author" });
  console.log(allQuizzes.map(quiz => quiz.toJSON()));

  // Récupérer un quiz en incluant ses tags
  const quiz = await Quiz.findByPk(1, { include: "tags" });
  console.log(quiz.toJSON());

  // Récupérer un tag en incluant les quizzes associés
  const tag = await Tag.findOne({
    where: { name: "Cinéma" },
    include: "quizzes"
  });
  console.log(tag.toJSON());

  // Récupérer toutes les propositions à la première question
  const question = await Question.findByPk(1, { include: "propositions" });
  console.log(question.toJSON());

  // Récupérer la question à partir d'une proposition
  const proposition = await Answer.findOne({
    where: { description: "Un os" },
    include: "question"
  });
  console.log(proposition.toJSON());

  // Récupérer la bonne réponse à la 10eme question
  const question10 = await Question.findByPk(10, { include: "good_answer" });
  console.log(question10.toJSON());

  // A partir d'une BONNE reponse, récupérer la question auquelle elle répond 
  const goodAnswer = await Answer.findByPk(20, { include: "question_answered" });
  console.log(goodAnswer.toJSON());

}
const Answer = require("./Answer");
const Level = require("./Level");
const Question = require("./Question");
const Quiz = require("./Quiz");
const Tag = require("./Tag");
const User = require("./User");

// Se référer à la documentation : https://sequelize.org/docs/v6/core-concepts/assocs/

// Sequelize : 
// - One-To-One : hasOne + belongsTo
// - One-To-Many : hasMany + belongsTo
// - Many-To-Many : belongsToMany + belongsToMany


// === Level <--> Question (One-To-Many) ===
Level.hasMany(Question, {
  foreignKey: "level_id", // nom de la clé étrangère
  as: "questions" // lorsque je requête un Level, je veux pouvoir inclure => ses questions
});
Question.belongsTo(Level, {
  foreignKey: "level_id", // nom de la clé étrangère
  as: "level" // lorsque je requête une question, je veux pouvoir inclure ==> son level
});


// === Question <-> Quiz (One-To-Many) ===
Quiz.hasMany(Question, {
  foreignKey: "quiz_id",
  as: "questions" // Quand je requête un quiz, je veux récupérer : ses questions
});
Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  as: "quiz" // Quand je requête une question, je veux pouvoir récupérer son quiz
});


// === User <-> Quiz (One-To-Many) ===
User.hasMany(Quiz, {
  foreignKey: "author_id",
  as: "quizzes"
});
Quiz.belongsTo(User, {
  foreignKey: "author_id",
  as: "author" // autre choix possible : "user", "creator"
});

// === Quiz <-> Tag (Many-to-Many) ===
Quiz.belongsToMany(Tag, {
  through: "quiz_has_tag", // nom de la table de liaison
  foreignKey: "quiz_id",
  otherKey: "tag_id", // Facultatif
  as: "tags"
});
Tag.belongsToMany(Quiz, {
  through: "quiz_has_tag",
  foreignKey: "tag_id",
  otherKey: "quiz_id", // Facultatif
  as: "quizzes"
});


// === Question <-> Answer (One-To-Many) (propositions) === 
Question.hasMany(Answer, {
  foreignKey: "question_id",
  as: "propositions" // A partir d'une question, je veux récupérer ses propositions ! (au choix: answers)
});
Answer.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question"
});

// === Question <-> Answer (One-To-One) (bonne réponse !) ===
Question.belongsTo(Answer, {
  foreignKey: "answer_id",
  as: "good_answer" // au choix : answer, good_answer, good_proposition
});
Answer.hasOne(Question, {
  foreignKey: "answer_id",
  as: "question_answered" // "question" est déjà pris
});


// Ré-exporter tous nos modèles avec leurs associations
module.exports = { Answer, Question, Quiz, Level, Tag, User };

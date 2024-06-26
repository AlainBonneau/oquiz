const Answer = require("./Answer");
const Level = require("./Level");
const Question = require("./Question");
const Quiz = require("./Quiz");
const Tag = require("./Tag");
const User = require("./User");

Level.hasMany(Question, {
  foreignKey: "level_id",
  as: "questions",
});
Question.belongsTo(Level, {
  foreignKey: "level_id",
  as: "level",
});

Quiz.hasMany(Question, {
  foreignKey: "quiz_id",
  as: "questions",
});
Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  as: "quiz",
});

User.hasMany(Quiz, {
  foreignKey: "author_id",
  as: "quizzes",
});
Quiz.belongsTo(User, {
  foreignKey: "author_id",
  as: "author",
});

Quiz.belongsToMany(Tag, {
  through: "quiz_has_tag",
  foreignKey: "quiz_id",
  otherKey: "tag_id",
  as: "tags",
});
Tag.belongsToMany(Quiz, {
  through: "quiz_has_tag",
  foreignKey: "tag_id",
  otherKey: "quiz_id",
  as: "quizzes",
});

Question.hasMany(Answer, {
  foreignKey: "question_id",
  as: "propositions",
});
Answer.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question",
});

Question.belongsTo(Answer, {
  foreignKey: "answer_id",
  as: "good_answer",
});
Answer.hasOne(Question, {
  foreignKey: "answer_id",
  as: "question_answered",
});

module.exports = { Answer, Question, Quiz, Level, Tag, User };

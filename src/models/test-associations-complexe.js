const { Quiz, Question, User } = require("./associations");

main();

async function main() {
  // Récupérer le quiz n°1 avec son auteur
  const quiz1 = await Quiz.findByPk(1, { include: "author" });
  console.log(quiz1.toJSON());

  // Récupérer le quiz n°2 avec son auteur et les tags du quiz !
  const quiz2 = await Quiz.findByPk(2, { include: ["author", "tags"] });
  console.log(quiz2.toJSON());

  // Récupérer le quiz n°3 avec son auteur MAIS UNIQUEMENT le champ firstname et lastname de l'auteur
  const quiz3 = await Quiz.findByPk(3, {
    include: {
      association: "author",
      attributes: ["firstname", "lastname"]
    }
  });
  console.log(quiz3.toJSON());

  // Récupérer la question n°1 (description) en incluant ses propositions (description) et son niveau (name)
  const question1 = await Question.findByPk(1, {
    attributes: ["description"],
    include: [
      { association: "propositions", attributes: ["description"] },
      { association: "level", attributes: ["name"] }]
  }
  );
  console.log(question1.toJSON());

  // Récupérer l'utilisateur Chuck, ses quizzes et les tags de ses quizzes !
  const chuck = await User.findOne({
    where: { firstname: "Chuck" },
    include: { association: "quizzes", include: "tags" }
  });
  console.log(chuck.toJSON());

  // Récupérer l'utilisateur Chuck, ses quizzes et les tags de ses quizzes !
  const chuck2 = await User.findOne({
    where: { firstname: "Chuck" },
    attributes: ["firstname", "lastname"],
    include: {
      association: "quizzes",
      attributes: ["title"],
      include: {
        association: "tags",
        attributes: ["name"],
        through: { attributes: [] } // BONUS = pour éviter d'inclure la table de liaison par défaut
      }
    }
  });
  console.log(JSON.stringify(chuck2, null, 2));

  // Exemple d'affichage avec des console.log
  console.log(`${chuck.firstname} ${chuck.lastname}`);
  chuck.quizzes.forEach(quiz => { // quiz = { title, tags: [] }
    console.log(`  - ${quiz.title}`);
    
    quiz.tags.forEach(tag => { // tag = { name }
      console.log(`    - ${tag.name}`);
    });
  });
}

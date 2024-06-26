const Answer = require("./Answer");
const Level = require("./Level");
const Question = require("./Question");
const Tag = require("./Tag");
const User = require("./User");
const { Op } = require("sequelize");

main();

async function main() {
  await testLevel();
  await testUser();
  await testVariousModels();
}

async function testLevel() {
  // ==== Level.findByPk() (PK = primary key) ===
  const expertLevel = await Level.findByPk(3);
  console.log(expertLevel.toJSON()); // .toJSON() permet de visualiser dans le console.log de manière plus sympathique

  // === Level.findAll() ===
  const levels = await Level.findAll();
  console.log(levels[0].toJSON());
  console.log(levels.map(level => level.toJSON()));
  console.log(JSON.stringify(levels, null, 2)); // [Level{}, Level{}, Level{}]

  // === Level.findOne() ===
  const confirmedLevel = await Level.findOne({ where: { name: "Confirmé" } }); // WHERE en SQL
  console.log(confirmedLevel.toJSON());

  const unexistingLevel = await Level.findOne({ where: { name: "Toto"} });
  console.log(unexistingLevel); // null


  // === Level.findAll() avec WHERE ===
  // Bonus 1 : trouver tous les levels avec un 't' dans leur nom
  const levelsWithT = await Level.findAll({ where: { name: { [Op.iLike]: "%t%" }} });
  console.log(levelsWithT.length);

  // Bonus 2 : trouver tous les levels créé avant midi 
  const oldLevels = await Level.findAll({ where: {
    created_at: { [Op.lte] : new Date("2024-02-19T11:00:00.000Z") }
  } });
  console.log(oldLevels.map(level => level.toJSON()));

  // === Level.findAll() avec d'autres options
  const twoFirstLevels = await Level.findAll({
    limit: 2,                          // LIMIT 2
    order: [["name", "ASC"]],          // ORDER BY "name" ASC
    attributes: ["name", "created_at"] // SELECT "name", "created_at"
  });
  console.log(twoFirstLevels.map(level => level.toJSON()));


  // === CREATION ===
  // 2 méthodes

  // === .save() ===
  const legendaryLevel = new Level({ name: "Légendaire" });
  await legendaryLevel.save();

  // === Level.create() ===
  const maniacLevel = await Level.create({ name: "Maniac"});
  console.log(maniacLevel);


  // === UPDATE ===
  // 2 méthodes

  // === level.save() ===
  const easyLevel = await Level.findByPk(1);
  easyLevel.name = "Facile";
  easyLevel.save();

  // === level.update() ===
  easyLevel.update({ name: "Facile !!" });


  // === DELETE ===
  await maniacLevel.destroy();

  // === DELETE MANY ===
  await Level.destroy({ where: { name: "Légendaire" } }); // Suprimer tous les niveau "Légendaire" de la BDD (s'il y en a plusieurs)
}

async function testUser() {
  const users = await User.findAll({ attributes: ["firstname", "email"]});
  console.log(users.map(user => user.toJSON()));
}

async function testVariousModels() {
  // Récupérer la question n°3
  const question3 = await Question.findByPk(3);
  console.log(question3.toJSON());

  // Récupérer les tags mais juste leurs noms !
  const tags = await Tag.findAll({ attributes: ["name"] });
  console.log(tags.map(tag => tag.toJSON()));
  console.log(JSON.stringify(tags, null, 2)); // null, 2 c'est pour faciliter la lecture

  // Récupérer seulement 5 answers, trié par ordre alphabétique
  const answers = await Answer.findAll({
    limit: 5,
    order: [["description", "ASC"]]
  });
  console.log(answers.map(answer => answer.toJSON()));

  // Insérer un tag
  const createdTag = await Tag.create({
    name: "Cinésport"
  });
  console.log(createdTag.toJSON());
}

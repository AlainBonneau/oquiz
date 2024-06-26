const { Level } = require("../models"); // équivalent de "../models/index.js" // Sucre !

const levelController = {
  async renderLevelsPage(req, res) {
    try {
      const levels = await Level.findAll();
      res.render("levels", { levels });

    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },

  async createLevel(req, res) {
    // récupérer les données du formulaire !
    // console.log(req.body); // { name: "Trivial" }

    // NEVER TRUST USER INPUT : valider que le name fourni a plus d'un caractère ==> VALIDER LE BODY
    if (! req.body.name) { // Si le name n'est pas présent ou vaut est falsy (string vide est falsy) alors 
      res.redirect("/levels"); // TODO : faire une meilleur gestion d'erreur pour améliorer l'affichage à l'utilisateur
      return;
    }

    try {

      const level = new Level({ name: req.body.name });
      await level.save();
      res.redirect("/levels"); // Rediriger vers la page des levels (pour ré-affichage)

    } catch (error) {

      console.error(error); // On log l'erreur pour que nous dev backend on puisse comprendre d'où elle vient et qu'elle ne se reproduise plus !
      res.status(500).render("500");

    }
  }
};

module.exports = levelController;

const notFoundMiddleware = (req, res) => {
  // Ce middleware est appelé APRES les autres, et prends en main les requêtes qui n'ont pas été intercepté par les middlewares précédents
  // Objectif de ce middleware, catcher tous les requêtes qui n'ont pas été "controllé" par les controlleurs précédents
  res.status(404).render("404");
};

module.exports = notFoundMiddleware;

// Bonus ! L'extraction est en bonus pour vous montrer que vous êtes libres sur l'arborescence des fichiers en Express !

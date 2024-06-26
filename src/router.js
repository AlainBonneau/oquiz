const { Router } = require("express");
const mainController = require("./controllers/mainController");
const levelController = require("./controllers/levelController");
const quizController = require("./controllers/quizController");
const tagController = require("./controllers/tagController");
const authController = require("./controllers/authController");
const adminController = require("./controllers/adminController");

// Création d'un router
const router = Router();

// Configuration du router

router.get("/", mainController.renderHomePage);
router.get("/levels", levelController.renderLevelsPage);
router.post("/levels", levelController.createLevel);
router.get("/quiz/:id", quizController.renderQuizPage);
router.post("/quiz/:id", isLoggedIn, quizController.renderQuizResultPage);
router.get("/tags", tagController.renderTagPage);

router.get("/login", authController.renderLoginPage);
router.post("/login", authController.loginUser);
router.get("/logout", isLoggedIn, authController.logoutUser);
router.get("/signup", authController.renderSignupPage);
router.post("/signup", authController.signupUser);
router.get("/me", isLoggedIn, authController.renderUserPage);
router.get("/admin", isAdmin, adminController.renderAdminPage);
router.post("/admin/modify-role/users/:id", adminController.modifyUserRole);
// Export du router
module.exports = router;

function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    // Si l'utilisateur n'est pas connecté
    // Solution 1 (plutôt user friendly)
    res.render("login", {
      errorMessage: "Veuillez vous connecter pour accéder à cette page.",
    }); // Alors on le redirige vers la page login
    return;

    // Solution 2
    // return res.status(401).send("Unauthorized"); // 401 = vous n'êtes pas authentifier pour accéder à la ressource
  }

  next(); // Sinon, on passe à la suite
}

function isAdmin(req, res, next) {
  // Si l'utilisateur n'est pas connecté => login
  if (!res.locals.user) {
    return res.render("login", { error: "Veuillez vous authentifier." });
    // return res.status(401).send("Unauthorized");
  }

  // Si l'utilisateur n'est pas admin
  if (res.locals.user.role !== "admin") {
    // Solution 1
    return res.status(404).render("404"); // Bonne pratique de sécurité, ne pas fournir l'information que la page exsite

    // Solution 2
    // return res.status(403).send("Forbidden"); // Autre pratique : envoyer le status 403 (vous êtes connecté mais vous n'avez pas les droits)
  }

  next(); // Si connecté + admin => on passe au controlleur
}

const { User } = require("../models");
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");

const authController = {
  renderLoginPage: (req, res) => {
    res.render("login");
  },

  renderSignupPage: (req, res) => {
    res.render("signup");
  },

  async loginUser(req, res) {
    const { email, password } = req.body;
    // Je cherche l'utilisateur en base de données
    const user = await User.findOne({
      where: {
        email,
      },
    });

    // Je vérifie si l'utilisateur existe
    if (!user) {
      return res.render("login", {
        errorMessage: "Mauvais couple email/mot de passe.",
      });
    }

    // Je vérifie si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("login", {
        errorMessage: "Mauvais couple email/mot de passe.",
      });
    }

    // Je stocke l'id de l'utilisateur en session
    req.session.user = user.id;

    // Je redirige l'utilisateur vers la page d'accueil
    res.redirect("/");
  },

  async signupUser(req, res) {
    const { firstname, lastname, email, password, confirmation } = req.body;

    // Je vérifie si tous les champs sont remplis
    if (!firstname || !lastname || !email || !password || !confirmation) {
      res.render("signup", {
        errorMessage: "Tous les champs sont obligatoires.",
      });
    }

    // Je vérifie si le mot de passe et sa confirmation sont identiques
    if (password !== confirmation) {
      return res.render("signup", {
        errorMessage:
          "Le mot de passe et sa confirmation ne correspondent pas.",
      });
    }

    // Je vérifie le format de l'email avec le module email-validator
    if (!emailValidator.validate(email)) {
      return res.render("signup", {
        errorMessage: "Le format de l'email n'est pas valide.",
      });
    }

    // Je vérifie la longueur du mot de passe
    if (password.length < 8) {
      // - 8 caractères minimum
      return res.render("signup", {
        errorMessage: "Le mot de passe doit faire plus de 8 caractères.",
      });
    }

    // Je vérifie si le mot de passe contient au moins un chiffre
    if (!/[0-9]/.test(password)) {
      return res.render("signup", {
        errorMessage: "Le mot de passe doit contenir au moins un chiffre.",
      });
    }

    // Je vérifie si le mot de passe contient au moins une lettre majuscule
    if (!/[A-Z]/.test(password)) {
      return res.render("signup", {
        errorMessage: "Le mot de passe doit contenir une lettre majuscule.",
      });
    }

    // Je vérifier si le mot de passe contient au moins une lettre minuscule
    if (!/[a-z]/.test(password)) {
      return res.render("signup", {
        errorMessage: "Le mot de passe doit contenir une lettre minuscule.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res.render("login", { successMessage: "Votre compte a bien été créé." });
  },

  async renderUserPage(req, res) {
    const userId = req.session.user;
    const user = await User.findByPk(userId);
    res.render("me", { user });
  },

  logoutUser(req, res) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  },
};

module.exports = authController;

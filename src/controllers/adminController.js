const { User } = require("../models");

const adminController = {
  async renderAdminPage(req, res) {
    try {
      const users = await User.findAll({
        order: [["email", "asc"]],
      });
      res.render("admin", { users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Page admin introuvable" });
    }
  },

  async modifyUserRole(req, res) {
    // console.log(req.body);
    const role = req.body.role;
    const userId = req.params.id;

    // Validation d'input
    if (!["admin", "member"].includes(role)) {
      return res.send("Pas ok !"); // TODO: res.render("admin", { errorMessage: "..." });
    }

    // TODO: Empecher l'utilsateur qui fait la requête de modifier son propre rôle

    const user = await User.findByPk(userId);
    // TODO: si pas de user, 404

    user.role = role;
    await user.save();

    res.redirect("/admin"); // TODO: res.render avec message de succès

    // TODO : les try/catch
  },
};

module.exports = adminController;

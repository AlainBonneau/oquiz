// test.js

// Importation des modules nécessaires
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { describe, test, expect, beforeEach } = require("@jest/globals");

// Charger le fichier HTML à tester
const html = fs.readFileSync("src/views/home.ejs", "utf-8");

// Définir la fonction de test
describe("Test de la génération de contenu HTML dynamique", () => {
  let dom;
  let document;

  // Avant chaque test, initialiser le DOM
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
  });

  // Test de la présence du titre "Bienvenue sur O'Quiz"
  test("Le titre 'Bienvenue sur O'Quiz' est présent sur la page", () => {
    const titleElement = document.querySelector("h2");
    expect(titleElement.textContent).toBe("Bienvenue sur O'Quiz");
  });
});

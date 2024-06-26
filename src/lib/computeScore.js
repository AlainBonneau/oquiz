function computeScore(questions, userSubmission) {
  // questions = [{ id: ..., answer_id: ... }, { id: ..., answer_id: ... }]
  // userSubmission = { '5': '779', '14': '14', '26': '26' }
  const nbOfQuestions = questions.length;
  // const score = questions.reduce((sum, question) => sum + (parseInt(userSubmission[question.id]) === question.answer_id ? 1 : 0), 0)

  let score = 0; // nombre de bonne réponse fourni par l'utilisateur
  questions.forEach((question) => {
    // question = { id: 8, answer_id: 8 },
    // on verifie si l'utilisateur a bien répondu à celle ci
    const questionId = question.id; // 8
    const goodAnswerId = question.answer_id; // 8
    const userAnswerId = parseInt(userSubmission[questionId]); // '782' => 782
    if (goodAnswerId === userAnswerId) {
      // et si oui, on augmente le score de 1
      score++;
    }
  });

  return { nbOfQuestions, score };
}

module.exports = computeScore;

export function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function shuffleQuestion(question) {
  const options = shuffle(question.options.map((text, index) => ({ text, index })));
  return {
    ...question,
    options: options.map(option => option.text),
    correctIndex: options.findIndex(option => option.index === question.correctIndex),
  };
}

// Only remove readings attached to Japanese options; retain meaningful English parentheses.
export function displayOption(option, showRomaji) {
  if (showRomaji || !/[\u3040-\u30ff\u3400-\u9fff]/u.test(option)) return option;
  return option.replace(/\s*\([A-Za-z][A-Za-z\s'~/-]*\)/g, '');
}

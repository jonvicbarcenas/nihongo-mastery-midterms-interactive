import { shuffle } from './practice.js';

// Each selected card appears once. Avoid the current card at the start of a new round.
export function shuffleKanaDeck(cardIds, previousId) {
  const order = shuffle(cardIds);
  if (order.length > 1 && order[0] === previousId) {
    const other = 1 + Math.floor(Math.random() * (order.length - 1));
    [order[0], order[other]] = [order[other], order[0]];
  }
  return order;
}

import { Score, Checkout } from "./class";
import { DOUBLEFIELDS, SCORINGDARTS, SCORINGDARTS2 } from "./const";

export const VALIDSCORES = (function () {
  const LEN = SCORINGDARTS.length;
  const scores = [];

  for (let i = LEN - 1; i >= 0; i--) {
    const first = SCORINGDARTS[i].value;

    for (let j = LEN - 1; j >= 0; j--) {
      const second = SCORINGDARTS[j].value;

      for (let k = LEN - 1; k >= 0; k--) {
        const third = SCORINGDARTS[k].value;

        const sum = first + second + third;
        if (!scores.some((item) => item === sum)) {
          scores.push(first + second + third);
        }
      }
    }
  }
  return scores;
})();

export const CHECKOUTS = (function () {
  const LEN = SCORINGDARTS2.length;
  const LEN2 = DOUBLEFIELDS.length;
  const scores = [];

  for (let i = LEN - 1; i >= 0; i--) {
    const rounder1 = SCORINGDARTS2[i];

    for (let j = LEN - 1; j >= 0; j--) {
      const rounder2 = SCORINGDARTS2[j];

      for (let k = LEN2 - 1; k >= 0; k--) {
        const double = DOUBLEFIELDS[k];

        const nod = (function () {
          if (i === 0 && j === 0) {
            return 1;
          }
          if (i === 0) {
            return 2;
          }
          return 3;
        })();

        const sum = rounder1.value + rounder2.value + double.value;

        const checkout = new Checkout(sum, nod, rounder1, rounder2, double);
        const score = scores.find((item) => item.value === sum);

        checkout.getSeq(nod);
        checkout.isValidCo(checkout);

        if (score) {
          if (checkout.isValid) {
            checkout.getRatingObj(score, checkout);
            score.checkouts.push(checkout);
          }
        } else {
          const newScore = new Score(sum, true, true, nod, [checkout]);
          checkout.getRatingObj(newScore, checkout);
          scores.push(newScore);
        }
      }
    }
  }
  scores.map((item) =>
    item.checkouts.sort((a, b) => a.rating - b.rating).splice(3),
  );

  return scores.sort((a, b) => a.value - b.value);
})();

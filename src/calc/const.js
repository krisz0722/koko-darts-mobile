export {
  Single,
  Double,
  Treble,
  SINGLEFIELDS,
  DOUBLEFIELDS,
  TREBLEFIELDS,
  SCORINGDARTS2,
  SCORINGDARTS,
};

function Single(num) {
  this.value = num;
  this.type = num === 0 ? "0" : num === 25 ? "sB" : "S";
  this.name = `${num}`;
  this.div = 1;
}

function Double(num) {
  this.value = num * 2;
  this.type = num === 25 ? "B" : "D";
  num === 25 ? (this.name = "BULL") : (this.name = this.type + num);
  this.weight = (function () {
    let count = 4;
    while (num % 2 === 0) {
      count--;
      num /= 2;
    }
    return count;
  })();
  this.div = 2;
}

function Treble(num) {
  this.value = num * 3;
  this.type = "T";
  this.name = this.type + num;
  this.div = 3;
}

const SINGLEFIELDS = (function () {
  const arr = [];

  for (let i = 0; i <= 20; i++) {
    const newObj = new Single(i);
    arr.push(newObj);
  }

  const newObj = new Single(25);
  newObj.isBull = true;
  arr.push(newObj);
  return arr;
})();

const DOUBLEFIELDS = (function () {
  const arr = [];

  for (let i = 1; i <= 20; i++) {
    const newObj = new Double(i);

    arr.push(newObj);
  }

  const newObj = new Double(25);
  newObj.isBull = true;
  newObj.weight = 5;
  arr.push(newObj);
  return arr;
})();

const TREBLEFIELDS = (function () {
  const arr = [];
  for (let i = 1; i <= 20; i++) {
    const newObj = new Treble(i);

    if (SINGLEFIELDS.some((item) => item.value === newObj.value) == false) {
      arr.push(newObj);
    }
  }
  return arr;
})();

const SCORINGDARTS = SINGLEFIELDS.concat(DOUBLEFIELDS).concat(TREBLEFIELDS);
const SCORINGDARTS2 = SINGLEFIELDS.concat(DOUBLEFIELDS.slice(-2)).concat(
  TREBLEFIELDS,
);

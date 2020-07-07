export { Score, Checkout };

function Score(
  value,
  isValid = false,
  isCo = false,
  nod = null,
  checkouts = null,
) {
  this.value = value;
  this.isValid = isValid;
  this.isCo = isCo;
  this.nod = nod;
  this.checkouts = checkouts;
}

class Checkout {
  constructor(
    value,
    nod,
    rounder1 = null,
    rounder2 = null,
    double,
    seq,
    weight = 0,
    backup = null,
    rating,
  ) {
    this.value = value;
    this.nod = nod;
    this.rounder1 = rounder1;
    this.rounder2 = rounder2;
    this.double = double;
    this.seq = undefined;
    this.isValid = undefined;
    this.weight = weight;
    this.backup = backup;
    this.ratingObj = undefined;
    this.rating = undefined;
  }

  getSeq(n) {
    const seq = [this.rounder1.type, this.rounder2.type, this.double.type];
    const spliced = (this.seq = seq.splice(n * -1));
    return (this.seq = spliced.join(""));
  }

  isValidCo(co) {
    return (this.isValid = co.seq !== "S0D" && co.seq !== "T0D");
  }

  getRatingObj(score, co) {
    const rO = {
      snod: 0,
      cnod: 0,
      missBackup: 0,
      hitBackup: 0,
      r1: 0,
      r2: 0,
      w: 0,
    };

    const snod = score.nod;
    const cnod = co.nod;

    const mBackup = "";
    //ket nyilas TD nel mar a missbackup weightje jobban nyom mint az alap weight pl 66, 69
    //missbackupnal ugyanugy ket nyilast keresunk! nem csak egy nyilast! lehetoleg SD!szoval 67re 50 -> 10 d20 pl
    const hBackup = "";

    const r1 = co.rounder1;
    const r2 = co.rounder2;
    const { double } = co;

    rO.snod = snod;
    rO.cnod = cnod;
    rO.w = double.weight;

    if (cnod === 2) {
      if (r1.value !== 0) {
        rO.r1 = 1;
      } else {
        rO.r1 = 0;
      }
      if (double.type === "B") {
        rO.r2 = 2;
      } else if (r2.type === "T") {
        rO.r2 = 1;
      } else if (r2.type === "S") {
        rO.r2 = 0;
      } else {
        rO.r2 = 2;
      }
    }

    const rating = [];

    for (const prop in rO) {
      rating.push(rO[prop]);
    }

    this.ratingObj = rO;
    return (this.rating = rating.join(""));
  }
}

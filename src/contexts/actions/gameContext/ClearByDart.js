const ClearByDart = (gameData, inputContext) => {
  const { inputByDart, whichDart } = inputContext;

  const apKey = gameData.activePlayer + "_DATA";
  const apData = gameData[apKey];
  const apScore = apData.score;
  const { first, second } = inputByDart;

  const newScore = () => {
    switch (whichDart) {
      case 1:
        return apScore;
      case 2:
        return apScore + first;
      case 3:
        return apScore + first + second;
    }
  };
  return newScore();
};

export default ClearByDart;

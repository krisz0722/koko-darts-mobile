import { useContext } from "react";
import { GameContext } from "../GameContext";

const ClearByDart = (state, initialState, inputMethod) => {
  const { dispatchGameData, gameData } = useContext(GameContext);

  const apKey = gameData.activePlayer + "_DATA";
  const apData = gameData[apKey];
  const apScore = apData.score;

  console.log("APSCORE", apScore);
  const { inputByDart, whichDart } = state;

  const { first, second, third } = inputByDart;

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

  dispatchGameData({
    type: "UPDATE_BY_DART",
    scoreToSubmit: 0,
    newScore: newScore(),
  });

  return {
    ...initialState,
    inputMethod,
  };
};

export default ClearByDart;

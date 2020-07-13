import React, { useContext } from "react";
import PLAYER_CHECKOUTS from "./ClassicCheckouts";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
import { FlexColAround } from "../../../styles/css_mixins";
import { GameContext } from "../../../contexts/GameContext";
import { SettingsContext } from "../../../contexts/SettingsContext";

export const ClassicCheckoutsPlayer = styled(View)`
  position: absolute;
  width: 50%;
  bottom: 0;
  height: 100%;
  ${FlexColAround};
  background-color: ${({ theme }) => theme.game.bgOnCheckout};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
`;
export const ClassicCheckoutsP1 = styled(ClassicCheckoutsPlayer)`
  position: absolute;
  width: 50%;
  height: 100%;
  ${FlexColAround};
  left: 0;
`;

export const ClassicCheckoutsP2 = styled(ClassicCheckoutsPlayer)`
  height: 100%;
  right: 0;
`;

const CHECKOUTS = ({ player }) => {
  const {
    gameData: { activePlayer },
  } = useContext(GameContext);

  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <>
      {player === "p1" ? (
        <ClassicCheckoutsP1 theme={selectedTheme} ap={activePlayer}>
          <PLAYER_CHECKOUTS player={"p1"} />
        </ClassicCheckoutsP1>
      ) : (
        <ClassicCheckoutsP2 theme={selectedTheme} ap={activePlayer}>
          <PLAYER_CHECKOUTS player={"p2"} />
        </ClassicCheckoutsP2>
      )}
    </>
  );
};

export default CHECKOUTS;

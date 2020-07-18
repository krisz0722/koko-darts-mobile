import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SettingsContext } from "../../../contexts/SettingsContext";
import ShapeThrow from "../../../../assets/shapeThrow";
import {
  View_Headers,
  Text_Subtitle,
  Text_Title,
  View_Shape,
  NumOfDarts,
  View_Screen,
} from "./StyledRematch";
import TABNAVIGATOR from "../../../components/navigation/TabNavigator";
import RADIO_BUTTON_SET from "../../../components/buttons/RadioButtonSet";
import { GameContext } from "../../../contexts/GameContext";

const REMATCH = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const {
    dispatchGameData,
    gameData: { p1, p2 },
  } = useContext(GameContext);

  const navigation = useNavigation();

  const [activePlayer, setActivePlayer] = useState(null);
  const [inactivePlayer, setInactivePlayer] = useState(null);

  const handlePLayerToStart = (val) => {
    const active = val === p1 ? p1 : p2;
    const inactive = active === p1 ? p2 : p1;
    setActivePlayer(active);
    setInactivePlayer(inactive);
  };

  const TABS = [
    {
      route: "homenavigator",
      text: "quit game",
      icon: "arrow-back",
      action: () => navigation.navigate("home"),
    },
    {
      route: "game",
      text: activePlayer ? "game on!" : "select",
      icon: activePlayer ? "check" : "person",
      action: function () {
        if (activePlayer) {
          dispatchGameData({ type: "REMATCH", activePlayer, inactivePlayer });
          navigation.navigate("game");
        }
        return null;
      },
    },
  ];

  const OPTIONS = [p1, p2];

  return (
    <View_Screen>
      <View_Headers theme={selectedTheme}>
        <Text_Title theme={selectedTheme}>throw for the start</Text_Title>
        <Text_Subtitle theme={selectedTheme}>
          selec the player to start the next match
        </Text_Subtitle>
        <NumOfDarts>
          <RADIO_BUTTON_SET
            direction={"horizontal"}
            options={OPTIONS}
            action={handlePLayerToStart}
            activeValue={activePlayer}
          />
        </NumOfDarts>
      </View_Headers>
      <View_Shape theme={selectedTheme}>
        <ShapeThrow fill={selectedTheme.bg3} />
      </View_Shape>
      <TABNAVIGATOR
        tabs={TABS}
        color={"dark"}
        position={"bottom"}
        length={3}
        direction={"horizontal"}
      />
    </View_Screen>
  );
};

export default REMATCH;

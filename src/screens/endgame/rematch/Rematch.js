import React, { useContext, useState } from "react";
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
    gameData: { p1, p2 },
  } = useContext(GameContext);

  const [nod, setNod] = useState(2);

  const handleNod = (val) => setNod(val);

  const TABS = [
    {
      route: "home",
      text: "quit game",
      icon: "arrow-back",
    },
    {
      route: "game",
      text: "game on!",
      icon: "check",
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
            action={handleNod}
            activeValue={nod}
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

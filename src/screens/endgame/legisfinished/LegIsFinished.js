import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { CHECKOUTS } from "../../../calc/scores";
import { SettingsContext } from "../../../contexts/SettingsContext";
import ShapeThrow from "../../../../assets/shapeThrow";
import {
  View_Headers,
  Text_Subtitle,
  Text_Title,
  View_Shape,
  NumOfDarts,
  View_Screen,
} from "./StyledLegIsFinished";
import TABNAVIGATOR from "../../../components/navigation/TabNavigator";
import RADIO_BUTTON_SET from "../../../components/buttons/RadioButtonSet";
import { GameContext } from "../../../contexts/GameContext";

const LEG_IS_FINISHED = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const navigation = useNavigation();

  const {
    dispatchGameData,
    gameData,
    gameData: { activePlayer, inactivePlayer, isLegOver, isMatchOver, winner },
  } = useContext(GameContext);

  const inapKey = `${inactivePlayer}_DATA`;
  const inapData = gameData[inapKey];

  const apKey = `${activePlayer}_DATA`;
  const apData = gameData[apKey];
  const apOnCheckout = apData.onCheckout;

  const nod = () => {
    if (isLegOver) {
      return CHECKOUTS.find((co) => co.value === inapData.lastScore)
        .checkouts[0].nod;
    }
    if (apOnCheckout) {
      return CHECKOUTS.find((co) => co.value === apData.score).checkouts[0].nod;
    }
    return null;
  };

  useEffect(() => {
    if (isMatchOver) {
      navigation.navigate("matchisfinished");
    }
  }, [isMatchOver, navigation]);

  const [lastRoundNod, setLastRoundNod] = useState(nod());

  const handleLastDartNod = (val) => setLastRoundNod(val);

  const TABS = [
    {
      route: "game",
      text: "back",
      icon: "arrow-back",
      action: () => {
        alert("SET LAST DART NOD");
        setLastRoundNod(null),
          dispatchGameData({ type: "BACK" }),
          navigation.navigate("game");
      },
    },
    {
      route: "matchisfinished",
      text: "ok",
      icon: "check",
      action: () => {
        console.log(lastRoundNod, isLegOver, isMatchOver);
        setLastRoundNod(null),
          dispatchGameData({
            type: "FINISH_LEG",
            nodUsed: lastRoundNod,
            nodRequired: parseInt(nod()),
          });
      },
    },
  ];

  const OPTIONS = [1, 2, 3];

  return (
    <View_Screen>
      <View_Headers theme={selectedTheme}>
        <Text_Title
          theme={selectedTheme}
        >{`${winner} has won the leg!`}</Text_Title>
        <Text_Subtitle theme={selectedTheme}>
          number of darts used:
        </Text_Subtitle>
        <NumOfDarts>
          <RADIO_BUTTON_SET
            direction={"horizontal"}
            options={OPTIONS}
            action={handleLastDartNod}
            activeValue={lastRoundNod}
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

export default LEG_IS_FINISHED;

//TODO disabling irrelevant nod options!!!!!
// TODO BACK DOES NOT WORK YET!!!!
// TODO after finishing leg and initializing rematch, current score whos a value!!!

import React, { useContext, useState } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import ShapeThrow from "../../../../assets/shapeThrow";
import {
  View_Headers,
  Text_Title,
  View_Shape,
  View_Screen,
} from "./StyledMatchIsFinished";
import TABNAVIGATOR from "../../../components/navigation/TabNavigator";
import { Text_Subtitle } from "../legisfinished/StyledLegIsFinished";

const MATCH_IS_FINISHED = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const TABS = [
    {
      route: "game",
      text: "back",
      icon: "arrow-back",
    },

    {
      route: "game",
      text: "show stats",
      icon: "show-chart",
    },
    {
      route: "rematch",
      text: "rematch",
      icon: "dart",
    },
  ];

  return (
    <View_Screen>
      <View_Headers theme={selectedTheme}>
        <Text_Title theme={selectedTheme}>valaki has won the match!</Text_Title>
        <Text_Subtitle theme={selectedTheme}>congratulations!</Text_Subtitle>
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

export default MATCH_IS_FINISHED;

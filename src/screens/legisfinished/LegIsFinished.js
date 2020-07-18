import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import ShapeThrow from "../../../assets/shapeThrow";
import {
  View_Headers,
  Text_Subtitle,
  Text_Title,
  View_Shape,
} from "./StyledLegIsFinished";
import TABNAVIGATOR from "../../components/navigation/TabNavigator";

const LEG_IS_FINISHED = () => {
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
      text: "ok",
      icon: "check",
    },
  ];

  return (
    <>
      <View_Headers theme={selectedTheme}>
        <Text_Title theme={selectedTheme}>valaki has won the leg!</Text_Title>
        <Text_Subtitle theme={selectedTheme}>
          number of darts used:
        </Text_Subtitle>
      </View_Headers>
      <View_Shape theme={selectedTheme}>
        <ShapeThrow fill={selectedTheme.bgActive} />
      </View_Shape>
      <TABNAVIGATOR
        tabs={TABS}
        position={"bottom"}
        length={3}
        direction={"horizontal"}
      />
    </>
  );
};

export default LEG_IS_FINISHED;

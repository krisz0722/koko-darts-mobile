import React, { useContext, useEffect } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import ShapeThrow from "../../../../assets/shapeThrow";
import {
  View_Headers,
  Text_Title,
  View_Shape,
  View_Screen,
} from "./StyledMatchIsFinished";
import { Text_Subtitle } from "../legisfinished/StyledLegIsFinished";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import MATCH_IS_FINISHED_NAVIGATOR from "../../../components/navigation/MatchIsFinishedNavigator";
import { GameContext } from "../../../contexts/GameContext";

const MATCH_IS_FINISHED = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const {
    gameData: { isMatchOver, winner },
  } = useContext(GameContext);

  const navigation = useNavigation();

  useEffect(() => {
    if (isMatchOver) {
      const backAction = () => {
        navigation.navigate("homenavigator");
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [isMatchOver, navigation]);

  return (
    <View_Screen>
      <View_Headers theme={selectedTheme}>
        <Text_Title
          theme={selectedTheme}
        >{`${winner} has won the match!`}</Text_Title>
        <Text_Subtitle theme={selectedTheme}>congratulations!</Text_Subtitle>
      </View_Headers>
      <View_Shape theme={selectedTheme}>
        <ShapeThrow fill={selectedTheme.bg3} />
      </View_Shape>
      <MATCH_IS_FINISHED_NAVIGATOR />
    </View_Screen>
  );
};

export default MATCH_IS_FINISHED;

import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CHECKOUTS } from "../../../calc/scores";
import ShapeThrow from "../../../../assets/shapeThrow";
import {
  View_Headers,
  Text_Subtitle,
  Text_Title,
  View_Shape,
  NumOfDarts,
  View_Screen,
} from "./StyledLegIsFinished";
import RADIO_BUTTON_SET from "../../../components/buttons/RadioButtonSet";
import { GameContext } from "../../../contexts/GameContext";
import { BackHandler } from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CUSTOM_TAB_NAVIGATOR from "../../../navigators/CustomTabNavigator";
import { InGameSettingsContext } from "../../../contexts/InGameSettingsContext";
import EXIT_APP_ALERT from "../../../components/modals/ExitAppAlert";
const LEG_IS_FINISHED = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const {
    dispatchGameData,
    gameData,
    gameData: { activePlayer, inactivePlayer, isLegOver, isMatchOver, winner },
  } = useContext(GameContext);

  const { inGameSettings } = useContext(InGameSettingsContext);

  const winnerName = winner ? gameData[winner].key : "";
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

  const [lastRoundNod, setLastRoundNod] = useState(nod() === 3 ? 3 : null);
  const [exitModal, setExitModal] = useState(false);

  const backAction = () => {
    setExitModal(true);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction,
  );
  useEffect(() => {
    return () => backHandler.remove();
  }, [backHandler]);

  const handleExitApp = () => {
    BackHandler.exitApp();
    setExitModal(!exitModal);
  };

  useEffect(() => {
    if (isMatchOver) {
      navigation.navigate("matchisfinished");
    }
  }, [isMatchOver, navigation]);

  const handleLastDartNod = (val) => setLastRoundNod(val);
  const OPTIONS = nod() === 3 ? [3] : nod() === 2 ? [2, 3] : [1, 2, 3];

  const TABS = [
    {
      route: "game",
      text: "UNDO",
      icon: "arrow-back",
      action: () => {
        setLastRoundNod(null),
          dispatchGameData({ type: "UNDO" }),
          navigation.navigate("game");
      },
    },
    {
      route: "game",
      text: lastRoundNod ? "ok" : "select",
      icon: lastRoundNod ? "check" : "dart",
      action: () => {
        if (lastRoundNod) {
          setLastRoundNod(null),
            dispatchGameData({
              type: "FINISH_LEG",
              nodUsed: lastRoundNod,
              nodRequired: parseInt(nod()),
              settings: inGameSettings,
            });
          navigation.navigate("game");
        } else {
          alert("BAJ");
        }
      },
    },
  ];

  console.log("RENDER LEGISFINISHED");

  return (
    <>
      <View_Screen>
        <View_Headers theme={theme}>
          <Text_Title
            theme={theme}
          >{`${winnerName} has won the leg!`}</Text_Title>
          <Text_Subtitle theme={theme}>number of darts used:</Text_Subtitle>
          <NumOfDarts>
            <RADIO_BUTTON_SET
              direction={"horizontal"}
              options={OPTIONS}
              length={3}
              action={handleLastDartNod}
              activeValue={lastRoundNod}
            />
          </NumOfDarts>
        </View_Headers>
        <View_Shape theme={theme}>
          <ShapeThrow fill={theme.bg3} />
        </View_Shape>
      </View_Screen>
      <CUSTOM_TAB_NAVIGATOR tabs={TABS} />
      <EXIT_APP_ALERT
        action1={() => setExitModal(!exitModal)}
        action2={handleExitApp}
        visible={exitModal}
      />
    </>
  );
};

export default LEG_IS_FINISHED;

//TODO disabling irrelevant nod options!!!!!

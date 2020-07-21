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
import TABNAVIGATOR from "../../../components/navigation/TabNavigator";
import RADIO_BUTTON_SET from "../../../components/buttons/RadioButtonSet";
import { GameContext } from "../../../contexts/GameContext";
import { BackHandler } from "react-native";
import LEAVE_MATCH_ALERT from "../../../components/modals/LeaveMatchAlert";
import { ThemeContext } from "../../../contexts/ThemeContext";
const LEG_IS_FINISHED = () => {
  const { theme } = useContext(ThemeContext);

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

  console.log("NUM OF DARTS REQUIRED", nod());

  const [lastRoundNod, setLastRoundNod] = useState(nod() === 3 ? 3 : null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (isMatchOver) {
      navigation.navigate("matchisfinished");
    }
  }, [isMatchOver, navigation]);

  useEffect(() => {
    const backAction = () => {
      setModal(true);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const handleLeaveMatch = () => {
    navigation.navigate("homenavigator");
  };

  const handleLastDartNod = (val) => setLastRoundNod(val);

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
      route: "matchisfinished",
      text: lastRoundNod ? "ok" : "select",
      icon: lastRoundNod ? "check" : "dart",
      action: () => {
        if (lastRoundNod) {
          setLastRoundNod(null),
            dispatchGameData({
              type: "FINISH_LEG",
              nodUsed: lastRoundNod,
              nodRequired: parseInt(nod()),
            });
        } else {
          null;
        }
      },
    },
  ];

  const OPTIONS = nod() === 3 ? [3] : nod() === 2 ? [2, 3] : [1, 2, 3];

  console.log(OPTIONS);

  return (
    <>
      <View_Screen>
        <View_Headers theme={theme}>
          <Text_Title theme={theme}>{`${winner} has won the leg!`}</Text_Title>
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
        <TABNAVIGATOR
          tabs={TABS}
          color={"dark"}
          position={"bottom"}
          length={3}
          direction={"horizontal"}
        />
      </View_Screen>
      <LEAVE_MATCH_ALERT
        action1={() => setModal(!modal)}
        action2={handleLeaveMatch}
        visible={modal}
      />
    </>
  );
};

export default LEG_IS_FINISHED;

//TODO disabling irrelevant nod options!!!!!

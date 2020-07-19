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
import { BackHandler } from "react-native";
import LEAVE_MATCH_ALERT from "../../../components/modals/LeaveMatchAlert";

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
      text: "back",
      icon: "arrow-back",
      action: () => {
        setLastRoundNod(null),
          dispatchGameData({ type: "BACK" }),
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

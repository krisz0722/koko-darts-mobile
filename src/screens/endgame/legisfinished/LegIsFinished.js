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
} from "./StyledLegIsFinished";
import TABNAVIGATOR from "../../../components/navigation/TabNavigator";
import RADIO_BUTTON_SET from "../../../components/buttons/RadioButtonSet";

const LEG_IS_FINISHED = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const [nod, setNod] = useState(2);

  const handleNod = (val) => setNod(val);

  const TABS = [
    {
      route: "game",
      text: "back",
      icon: "arrow-back",
    },
    {
      route: "matchisfinished",
      text: "ok",
      icon: "check",
    },
  ];

  const OPTIONS = [1, 2, 3];

  return (
    <View_Screen>
      <View_Headers theme={selectedTheme}>
        <Text_Title theme={selectedTheme}>valaki has won the leg!</Text_Title>
        <Text_Subtitle theme={selectedTheme}>
          number of darts used:
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

export default LEG_IS_FINISHED;

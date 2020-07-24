import React from "react";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
import { FlexRow } from "../../../styles/css_mixins";
import NUM_BUTTON from "../../buttons/NumButton";
import PLAYER_INPUT_INFO from "./PlayerInputInfo";
import DATA_MIDDLE from "./DataMiddle";
import { useNavigation } from "@react-navigation/native";

export const ClassicMiddle = styled(View)`
  ${FlexRow};
  position: absolute;
  flex-wrap: wrap;
  top: 45%;
  width: 100%;
  height: 18%;
`;

const CLASSIC_MIDDLE = React.memo((props) => {
  const {
    setDrawer,
    drawer,
    activePlayer,
    theme,
    animation,
    inactivePlayer,
  } = props;

  const navigation = useNavigation();

  console.log("RENDER MIDDLE");
  return (
    <ClassicMiddle>
      {DATA_MIDDLE().map((item) => {
        const action = () => {
          navigation.toggleDrawer();
          setDrawer(!drawer);
        };
        return (
          <React.Fragment key={item.value}>
            {item.type === "info" ? (
              <PLAYER_INPUT_INFO
                animation={animation}
                theme={theme}
                activePlayer={activePlayer}
                inactivePlayer={inactivePlayer}
                value={item.value}
                player={item.value}
              />
            ) : (
              <NUM_BUTTON
                middle={true}
                type={item.type}
                value={item.value}
                action={item.value === "MENU" ? action : item.action}
                icon={item.icon}
                animation={animation}
                theme={theme}
                activePlayer={activePlayer}
                inactivePlayer={inactivePlayer}
              />
            )}
          </React.Fragment>
        );
      })}
    </ClassicMiddle>
  );
});

export default CLASSIC_MIDDLE;

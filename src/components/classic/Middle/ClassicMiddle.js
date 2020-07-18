import React from "react";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
import { FlexRow } from "../../../styles/css_mixins";
import NUM_BUTTON from "../../buttons/NumButton";
import PLAYER_INPUT_INFO from "../../buttons/PlayerInputInfo";
import DATA_MIDDLE from "./DataMiddle";

export const ClassicMiddle = styled(View)`
  ${FlexRow};
  position: absolute;
  flex-wrap: wrap;
  top: 45%;
  width: 100%;
  height: 18%;
`;

const CLASSIC_MIDDLE = () => {
  return (
    <ClassicMiddle>
      {DATA_MIDDLE().map((item) => (
        <React.Fragment key={item.value}>
          {item.value === "p2" || item.value === "p1" ? (
            <PLAYER_INPUT_INFO value={item.value} name={item.value} />
          ) : (
            <NUM_BUTTON
              middle={true}
              type={item.type}
              value={item.value}
              action={item.action}
              icon={item.icon}
            />
          )}
        </React.Fragment>
      ))}
    </ClassicMiddle>
  );
};

export default CLASSIC_MIDDLE;

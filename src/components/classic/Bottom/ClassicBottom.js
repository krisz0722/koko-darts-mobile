import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native/dist/styled-components.native.esm";
import { FlexRow } from "../../../styles/css_mixins";
import DATA_BOTTOM from "./DataBottom";
import NUM_BUTTON from "../../buttons/NumButton";

export const ClassicBottom = styled(Animated.View)`
  ${FlexRow};
  flex-wrap: wrap;
  position: absolute;
  top: 63%;
  width: 100%;
  height: 37%;
`;

const CLASSIC_BOTTOM = React.memo(() => {
  return (
    <ClassicBottom>
      {DATA_BOTTOM().map((item) => {
        return (
          <NUM_BUTTON
            key={item.value}
            type={item.type}
            value={item.value}
            action={item.action}
            icon={item.icon}
          />
        );
      })}
    </ClassicBottom>
  );
});

export default CLASSIC_BOTTOM;

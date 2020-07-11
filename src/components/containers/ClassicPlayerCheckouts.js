import styled from "styled-components/native/dist/styled-components.native.esm";
import { View } from "react-native";
import { FlexColAround, FlexColStart } from "../../styles/css_mixins";

export const ClassicCheckouts = styled(View)`
  ${FlexColStart};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  background-color: ${({ theme }) => theme.game.bgOnCheckout};
`;

export const ClassicCheckoutsPlayer = styled(View)`
  position: absolute;
  width: 50%;
  height: 100%;
  ${FlexColAround};
  border-color: ${({ ap, theme }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;
export const ClassicCheckoutsP1 = styled(ClassicCheckoutsPlayer)`
  height: 100%;
  left: 0;
`;

export const ClassicCheckoutsP2 = styled(ClassicCheckoutsPlayer)`
  height: 100%;
  right: 0;
`;

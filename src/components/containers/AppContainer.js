import styled from "styled-components/native";
import { ImageBackground, View } from "react-native";
import { Window, FlexRow } from "../../styles/css_mixins";

export const AppBackground = styled(ImageBackground)`
  width: ${() => Window.width};
  height: ${() => Window.height};
  position: absolute;
  background-color: transparent;
  top: 0;
`;

export const ScreenContainer = styled(View)`
  ${FlexRow};
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bgOverlay};
`;

// border: 2px green solid;

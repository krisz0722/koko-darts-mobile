import styled from "styled-components";
import { View } from "react-native";
import {
  BorderHorizontal,
  FlexRowAround,
  Window,
} from "../../styles/css_mixins";

export const NavBar = styled(View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${() => Window.height * 0.08};
  ${FlexRowAround};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const TopNavBar = styled(NavBar)`
  position: relative;
  top: 0;
  ${BorderHorizontal(({ theme }) => theme.borderColor)};
`;

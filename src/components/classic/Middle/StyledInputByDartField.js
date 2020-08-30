import styled from "styled-components";
import { Animated } from "react-native";
import { BasicTextBold, FlexRowAround } from "../../../styles/css_mixins";

export const Container = styled(Animated.View)`
  ${FlexRowAround}
  width: ${() => 100 / 3 + "%"};
  padding:2%;
  height:50%;  
  background-color: ${({ theme }) => theme.bgGreen};
  border-color: ${({ theme, ap }) => theme.game[ap + "Border"]};
  border-width: ${({ theme }) => theme.borderWidth};
`;
export const Text_Function = styled(Animated.Text)`
  ${BasicTextBold};
  font-size: ${({ theme }) => theme.fontSizeFunction};
  color: ${({ theme }) => theme.text};
`;

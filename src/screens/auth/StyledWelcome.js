import styled from "styled-components/native";
import { View } from "react-native";
import {
  FlexColBetween,
  FlexCol,
  FlexRowBetween,
} from "../../styles/css_mixins";
import { TitleBig } from "../../components/headers/StyledHeaders";

export const View_Headers = styled(View)`
  width: 100%;
  margin: 15% 0;
  height: 20%;
  ${FlexRowBetween};
`;

export const WelcomeHeader = styled(TitleBig)`
  width: 30%;
  height: 100%;
  color: ${({ fill, theme }) => (fill ? theme.text : theme.text)};
  background-color: ${({ fill, theme }) =>
    fill ? "transparent" : "transparent"};
`;

export const View_Buttons = styled(View)`
  width: 100%;
  height: 50%;
  ${FlexColBetween};
`;

export const View_Shape = styled(View)`
  ${FlexCol};
  bottom: 0;
  width: 40%;
  height: 100%;
`;

export const Text_Title = styled(TitleBig)`
  width: 100%;
  margin: 2% 0;
  color: ${({ theme, color }) => (color ? color : theme.text)};
`;

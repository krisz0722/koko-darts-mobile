import styled from "styled-components";
import { Text, View } from "react-native";
import {
  FlexColEnd,
  BasicTextBold,
  FlexColAround,
  FlexColBetween,
} from "../../styles/css_mixins";

export const View_Headers = styled(View)`
  width: 100%;
  height: 10%;
  ${FlexColAround};
`;

export const View_Buttons = styled(View)`
  width: 100%;
  height: 50%;
  ${FlexColBetween};
`;

export const View_Shape = styled(View)`
  ${FlexColEnd};
  width: 100%;
  bottom: 0;
  height: 40%;
`;

export const Text_Title = styled(Text)`
  ${BasicTextBold}
  width: 100%;
  margin: 2% 0;
  color: ${({ theme, color }) => (color ? color : theme.text)};
  font-size: ${({ theme }) => theme.welcome.fontSize1};
`;

export const Text_Subtitle = styled(Text_Title)`
  ${BasicTextBold};
  padding: 2.5% 5%;
  background-color: ${({ theme }) => theme.bgActive};
  color: ${({ theme }) => theme.text2};
  font-size: ${({ theme }) => theme.welcome.fontSize2};
`;

export const Text_Subtitle2 = styled(Text_Subtitle)`
  background-color: transparent;
  bottom: 0;
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.welcome.fontSize3};
`;

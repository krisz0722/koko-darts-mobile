import styled from "styled-components";
import { Text, View } from "react-native";
import {
  FlexColEnd,
  FlexCol,
  BorderVertical,
  BasicTextBold,
} from "../../../styles/css_mixins";

export const View_Screen = styled(View)`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
`;

export const View_Headers = styled(View)`
  width: 100%;
  top: 15%;
  height: 35%;
  ${FlexCol};
  ${BorderVertical(({ theme }) => theme.bg3)};
`;

export const View_Shape = styled(View)`
  ${FlexColEnd};
  position: absolute;
  width: 100%;
  bottom: 8%;
  height: 40%;
`;

export const Text_Title = styled(Text)`
  ${BasicTextBold}
  width: 100%;
  margin: 2% 0;
  color: ${({ theme, color }) => (color ? color : theme.text2)};
  font-size: ${({ theme }) => theme.welcome.fontSize1};
`;

export const Text_Subtitle = styled(Text_Title)`
  ${BasicTextBold};
  padding: 2.5% 5%;
  background-color: ${({ theme }) => theme.bgActive};
  color: ${({ theme }) => theme.text2};
  font-size: ${({ theme }) => theme.welcome.fontSize2};
`;

export const NumOfDarts = styled(View)`
  ${FlexCol};
  width: 80%;
  bottom: 0;
  color: ${({ theme }) => theme.text};
  height: 50%;
`;

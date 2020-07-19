import styled from "styled-components";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import {
  BasicText,
  BasicTextBold,
  FlexCol,
  FlexColAround,
  FlexRowAround,
} from "../../styles/css_mixins";

export const ModalContainerBasic = styled(View)`
  height: 100%;
  width: 100%;
  padding: 10% 0;
  ${FlexColAround};
  background-color: rgba(255, 255, 255, 0.95);
`;

export const ModalContainerAlert = styled(ModalContainerBasic)`
  ${FlexCol};
  padding: 50% 0;
`;

export const ModalContainerSearch = styled(ScrollView)`
  background-color: rgba(255, 255, 255, 0.95);
`;

export const Header = styled(Text)`
${BasicTextBold}
height:10%;
width:100%;
margin:auto;
background-color: ${({ theme }) => theme.bg1};
color: ${({ theme }) => theme.text}
font-size:20;
`;

export const Header2 = styled(Header)`
  height: 20%;
`;

export const Header3 = styled(Header)`
  ${BasicText};
  height:20%;
  width:90%;
  background-color: transparent;
  color: ${({ theme }) => theme.bg1}
  font-size:15;
`;

export const Header4 = styled(Header)`
  font-size: 15;
`;

export const BottomButtons = styled(View)`
  ${FlexRowAround};
  height: 15%;
  width: 100%;
`;

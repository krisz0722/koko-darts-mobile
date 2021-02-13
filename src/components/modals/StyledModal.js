import styled from "styled-components";
import { ScrollView, View } from "react-native";
import { FlexCol, FlexColAround, FlexRowAround } from "../../styles/css_mixins";
import { Header3 } from "../headers/StyledHeaders";

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

export const ModalContainerLoading = styled(ModalContainerBasic)`
  background-color: transparent;
  height: 25%;
  width: 90%;
  ${FlexColAround};
  border-radius: ${({ filled }) => (filled ? "15px" : "0px")};
`;

export const Header = styled(Header3)`
  height: 10%;
  width: 100%;
  margin: auto;
  background-color: ${({ theme }) => theme.bg1};
`;

export const Header2 = styled(Header3)`
  height: 20%;
  width: 100%;
  margin: auto;
  background-color: ${({ theme }) => theme.bg1};
`;

export const BottomButtons = styled(View)`
  ${FlexRowAround};
  height: 20%;
  width: 100%;
`;

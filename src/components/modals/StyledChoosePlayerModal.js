import styled from "styled-components";
import { View, ScrollView } from "react-native";
import { FlexCol, FlexRowAround, Window } from "../../styles/css_mixins";
import { Header3 } from "../headers/StyledHeaders";
import { StyledTextInput } from "../headers/StyledTextInput";

export const ModalContainerSearch = styled(ScrollView)`
  background-color: rgba(255, 255, 255, 0.95);
`;

export const SearchInput = styled(StyledTextInput)`
  color: ${({ theme, active }) => (active ? theme.text : theme.text2)};
  width: 60%;
`;

export const SearchBar = styled(View)`
  width: 80%;
  margin: auto;
  height: 8%;
  border-color: ${({ theme }) => theme.text2};
  background-color: ${({ theme, active }) =>
    active ? theme.bgRed : theme.bg2};
  border-radius: 30;
  border-width: 2;
  padding: 0 1.5%;
  ${FlexRowAround};
`;

export const Container = styled(View)`
  width: 100%;
  height: ${() => Window.height * 0.9};
  ${FlexCol};
`;

export const Header = styled(Header3)`
  height: 10%;
  width: 100%;
  margin: auto;
  background-color: ${({ theme }) => theme.bg1};
`;

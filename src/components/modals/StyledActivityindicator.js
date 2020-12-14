import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import { FlexCol } from "../../styles/css_mixins";
import { Header2 } from "../headers/StyledHeaders";

export const Safe = styled(SafeAreaView)`
  height: 100%;
  width: 100%;
  ${FlexCol};
  background-color: ${({ theme, filled }) =>
    filled ? theme.bgOverlay2 : "transparent"};
`;

export const Loading = styled(Header2)`
  color: ${({ theme, filled }) => (filled ? theme.text : theme.text)};
`;

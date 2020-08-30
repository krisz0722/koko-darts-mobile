import { View } from "react-native";
import styled from "styled-components";
import { FlatList } from "react-native";
import { FlexRowBetween } from "../../styles/css_mixins";

export const MatchesContainer = styled(FlatList)`
  width: 100%;
  height: 100%;
`;

export const Header = styled(View)`
  ${FlexRowBetween};
  padding: 3% 2%;
  background-color: ${({ theme }) => theme.bg1};
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.borderColor};
`;

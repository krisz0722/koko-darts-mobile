import styled from "styled-components";
import { FlatList } from "react-native";

export const MatchesContainer = styled(FlatList)`
  width: 100%;
  height: 100%;
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

import styled from "styled-components/native";
import { FlatList } from "react-native";

export const FriendsContainer = styled(FlatList)`
  width: 100%;
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

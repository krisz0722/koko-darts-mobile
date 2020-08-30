import { SafeAreaView } from "react-native";
import styled from "styled-components";
import { FlatList } from "react-native";
import { BorderVertical } from "../../styles/css_mixins";

export const Safe = styled(SafeAreaView)`
  height: 50%;
  width: 100%;
  background-color: ${({ theme }) => theme.text2};
`;

export const ProfilesContainer = styled(FlatList)`
  width: 100%;
  height: 100%;
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  ${BorderVertical(({ theme }) => theme.borderColor)}
  border-color: ${({ theme }) => theme.borderColor};
`;

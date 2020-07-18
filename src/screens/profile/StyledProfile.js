import { Text, View } from "react-native";
import styled from "styled-components";
import {
  BasicTextBold,
  Border,
  FlexColAround,
  FlexRow,
  Window,
} from "../../styles/css_mixins";

export const Header = styled(View)`
  ${FlexRow};
  height: 30%;
  width: 100%;
`;

export const Container = styled(View)`
  ${FlexColAround};
  width: 50%;
  height: 100%;
`;

export const SubContainer = styled(View)`
  width: 75%;
  height: ${() => (Window.width / 2 / 4) * 3};
  border-radius: 4px;
  ${Border(({ theme }) => theme.text)};
`;

export const Name = styled(Text)`
  ${BasicTextBold};
  width: 75%;
  color: ${({ theme }) => theme.text};
`;

export const NavigationWindow = styled(View)`
  height: 62%;
  width: 100%;
`;

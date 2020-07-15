import styled from "styled-components";
import { View } from "react-native";
import { FlexRowAround, Window } from "../styles/css_mixins";

const NavBar = styled(View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${() => Window.height * 0.08};
  ${FlexRowAround};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export default NavBar;

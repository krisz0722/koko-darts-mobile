import styled from "styled-components";
import { View } from "react-native";
import { FlexRowAround } from "../styles/css_mixins";

const NavBar = styled(View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8%;
  ${FlexRowAround};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export default NavBar;

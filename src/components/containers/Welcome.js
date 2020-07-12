import styled from "styled-components";
import { View } from "react-native";
import { FlexColEnd, FlexColAround } from "../../styles/css_mixins";

export const View_Headers = styled(View)`
  width: 100%;
  height: 30%;
  position: absolute;
  top: 20%;
  ${FlexColAround};
  border: 2px white solid;
  opacity: ${({ isEditing }) => (isEditing ? 1 : 0)};
  background-color: ${({ bg }) => bg};
`;

export const View_Shape = styled(View)`
  ${FlexColEnd};
  position: absolute;
  width: 100%;
  bottom: 10%;
  height: 40%;
`;

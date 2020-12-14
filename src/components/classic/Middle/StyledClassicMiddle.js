import styled from "styled-components/native";
import { View } from "react-native";
import { FlexRow } from "../../../styles/css_mixins";

export const ClassicMiddle = styled(View)`
  ${FlexRow};
  position: absolute;
  flex-wrap: wrap;
  top: 45%;
  width: 100%;
  height: 18%;
`;

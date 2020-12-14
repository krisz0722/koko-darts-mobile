import styled from "styled-components/native";
import { FlexColStart, FlexRowAround } from "../../../styles/css_mixins";
import { View } from "react-native";

export const Row = styled(View)`
  height: 14%;
  width: 100%;
  ${FlexColStart};
  opacity: ${({ preview }) => (preview ? 0 : 1)};
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

export const Row2 = styled(Row)`
  height: 7%;
  width: 100%;
`;

export const Div = styled(View)`
  ${FlexRowAround};
  width: 100%;
  height: 50%;
`;

export const Div2 = styled(Div)`
  height: 100%;
`;

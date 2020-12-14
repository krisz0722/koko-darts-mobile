import { Row2 } from "../home/StyledSettings";
import styled from "styled-components/native";
import { View } from "react-native";
import { FlexColAround, FlexRow, Window } from "../../../styles/css_mixins";
import { P2 } from "../../../components/headers/StyledHeaders";

export const RowMod = styled(Row2)``;

export const HistoryContainer = styled(View)`
  ${FlexColAround};
  height: 18%;
  width: 100%;
`;

export const HistoryRow = styled(View)`
  width: 100%;
  ${FlexRow};
`;

export const Data = styled(P2)`
  width: ${() => Window.width / 3};
`;

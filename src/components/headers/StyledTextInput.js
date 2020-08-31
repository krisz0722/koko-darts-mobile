import styled from "styled-components";
import { TextInput } from "react-native";
import { BasicText } from "../../styles/css_mixins";

export const StyledTextInput = styled(TextInput)`
  ${BasicText}
  font-size: ${({ theme }) => theme.fonts.textInput};
  color: ${({ focused, valid, theme }) =>
    focused ? theme.text2 : valid ? theme.text : theme.borderColor};
`;

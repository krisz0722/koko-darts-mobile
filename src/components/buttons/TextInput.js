import React, { useContext } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, View } from "react-native";
import { FlexRowAround, Window } from "../../styles/css_mixins";
import { ThemeContext } from "../../contexts/ThemeContext";
import { StyledTextInput } from "../headers/StyledTextInput";

const Div = styled(View)`
  ${FlexRowAround};
  height: ${({ multiline }) =>
    multiline ? Window.height * 0.3 : Window.height * 0.08};
  border-radius: 4px;
  margin: 2% 0;
  width: 80%;
  background-color: ${({ focused, theme }) =>
    focused ? theme.bgActive : "rgba(255,255,255,0.1)"};
`;

const TextInput_Login = styled(StyledTextInput)`
  height: 100%;
  width: 80%;
  color: ${({ focused, valid, theme }) =>
    focused ? theme.text2 : valid ? theme.text : theme.borderColor};
`;

const TEXT_INPUT = React.memo(
  ({ handleFocus, valid, focused, input, multiline = false }) => {
    const { theme } = useContext(ThemeContext);

    const { value, name, icon, iconAction, action, placeholder, type } = input;

    return (
      <Div multiline={multiline} valid={valid} focused={focused} theme={theme}>
        <TextInput_Login
          secureTextEntry={type === "password" && icon === "visibility"}
          valid={valid}
          value={value}
          onFocus={() => handleFocus(name)}
          focused={focused}
          onChangeText={action}
          placeholder={placeholder}
          type={type}
          theme={theme}
          placeholderTextColor={theme.borderColor}
          multiline={multiline}
        />
        <TouchableWithoutFeedback
          onPress={() =>
            focused && value.length > 0 ? action("") : iconAction()
          }
        >
          <Icon
            name={focused && value.length > 0 ? "clear" : icon}
            size={theme.fonts.icon1}
            color={focused ? theme.bg3 : valid ? theme.text : theme.borderColor}
          />
        </TouchableWithoutFeedback>
      </Div>
    );
  },
);

export default TEXT_INPUT;

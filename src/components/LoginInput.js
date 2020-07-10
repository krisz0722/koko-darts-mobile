import React, { useContext } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components";
import { TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SettingsContext } from "../contexts/SettingsContext";
import { FlexRowAround, Window } from "../styles/css_mixins";

const Div = styled(View)`
  ${FlexRowAround};
  height: ${() => Window.height * 0.08};
  border-bottom-width: ${({ theme, focused }) =>
    !focused ? theme.borderWidth : 0};
  border-color: ${({ theme, valid }) =>
    valid ? theme.text : theme.borderColor};
  border-radius: 4px;
  margin: 2% 0;
  width: 100%;
  background-color: ${({ focused, theme }) =>
    focused == true ? theme.bgActive : "transparent"};
`;

const TextInput_Login = styled(TextInput)`
  height: 100%;
  width: 80%;
  font-size: ${({ theme }) => theme.menu.fontSizeText};
  font-size: 20;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ focused, valid, theme }) =>
    focused ? theme.text2 : valid ? theme.text : theme.borderColor};
`;

const LoginInput = ({ handleFocus, valid, focused, input }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const theme = selectedTheme;
  const { value, name, icon, iconAction, action, placeholder, type } = input;

  return (
    <Div valid={valid} focused={focused} theme={theme}>
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
      />
      <TouchableWithoutFeedback
        onPress={() =>
          focused && value.length > 0 ? action("") : iconAction()
        }
      >
        <Icon
          name={focused && value.length > 0 ? "clear" : icon}
          size={25}
          color={focused ? theme.bg3 : valid ? theme.text : theme.borderColor}
        />
      </TouchableWithoutFeedback>
    </Div>
  );
};

export default LoginInput;

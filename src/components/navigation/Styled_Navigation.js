import styled from "styled-components";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { FlexCol, FlexRow } from "themes/css_mixins";

export const Button_Login = styled(TouchableOpacity)`
  text-decoration: none;
  width: 100%;
  height: 15%;
`;

export const Button_Nav = styled(TouchableOpacity)`
  ${FlexCol};
  width: 50%;
  height: 100%;
  text-align: center;
  background-color: transparent;
`;

export const Text_Button = styled(Text)`
  ${FlexCol};
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: ${({ theme }) => theme.menu.fontWeight};
  font-size: ${({ theme }) => theme.menu.fontSize};
  text-align: center;
  border-radius: 4px;
  text-align-vertical: center;
  text-transform: ${({ theme }) => theme.textTransform};
  height: 100%;
  width: 100%;
  padding: 0 5%;
`;

export const Text_Button_Login = styled(Text_Button)`
  font-size: ${({ theme }) => theme.menu.fontSizeLogin};
  color: ${({ theme }) => theme.text};
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.text};
  font-size: 12.5;
  font-weight: bold;
`;

export const NavBar = styled(View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10%;
  ${FlexRow};
  justify-content: space-around;
  border-top-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

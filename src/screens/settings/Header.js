import React, { useContext } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { AlignText, FlexRow } from "../../styles/css_mixins";
import { ThemeContext } from "../../contexts/ThemeContext";

const HeaderContainer = styled(View)`
  ${FlexRow};
  width: 100%;
  height: ${({ header }) => (header ? "100%" : "50%")};
  background-color: rgba(255, 255, 255, 0.1);
`;

const Header = styled(Text)`
  ${AlignText};
  text-transform: ${({ theme }) => theme.textTransform};
  font-family: ${({ theme }) => theme.fontFamilyBold};
  font-size: ${({ theme }) => theme.settings.fontSizeHeader};
  color: ${({ theme }) => theme.text};
`;

const SETTINGS_HEADER = ({ inGameTheme, text, header = false }) => {
  const { theme } = useContext(ThemeContext);

  const themeToUse = inGameTheme ? inGameTheme : theme;

  return (
    <HeaderContainer header={header}>
      <Header theme={themeToUse}>{text}</Header>
    </HeaderContainer>
  );
};

export default SETTINGS_HEADER;

import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components";
import { AlignText, FlexRow } from "../../styles/css_mixins";

const HeaderContainer = styled(View)`
  ${FlexRow};
  width: 100%;
  height: 50%;
  background-color: rgba(255, 255, 255, 0.1);
`;

const Header = styled(Text)`
  ${AlignText};
  text-transform: ${({ theme }) => theme.textTransform};
  font-family: ${({ theme }) => theme.fontFamilyBold};
  font-size: ${({ theme }) => theme.settings.fontSizeHeader};
  color: ${({ theme }) => theme.text};
`;

const SETTINGS_HEADER = ({ text, action, icon = null }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);
  const theme = selectedTheme;
  console.log(icon);

  return (
    <HeaderContainer>
      <Header theme={theme}>{text}</Header>
      {icon ? (
        <TouchableWithoutFeedback onPress={action}>
          <Icon
            style={{ alignSelf: "flex-start", margin: 5 }}
            name={icon}
            size={15}
            color={theme.text}
          />
        </TouchableWithoutFeedback>
      ) : null}
    </HeaderContainer>
  );
};

export default SETTINGS_HEADER;

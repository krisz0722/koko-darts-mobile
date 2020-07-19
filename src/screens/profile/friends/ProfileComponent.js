import React, { useContext, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { SettingsContext } from "../../../contexts/SettingsContext";
import {
  BasicText,
  FlexRowAround,
  FlexRowStart,
  Window,
} from "../../../styles/css_mixins";
import CheckBox from "@react-native-community/checkbox";

export const Profile = styled(View)`
  ${FlexRowAround};
  margin: auto;
  margin: 2.5%;
`;

export const ProfileAvatar = styled(Image)`
  width: ${() => Window.height * 0.06};
  height: ${() => Window.height * 0.06};
  border-radius: ${() => Window.height * 0.075};
  border-width: ${({ theme }) => theme.borderWidth}
  border-color: ${({ theme }) => theme.text}
  margin-right:10%;
`;

export const Name = styled(Text)`
  ${BasicText};  
  text-align:left;
  color: ${({ theme }) => theme.text}
  width: 50%;
  font-size: 15;
`;

const PROFILE_COMPONENT = ({ item }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const [active, setActive] = useState(false);

  return (
    <Profile theme={selectedTheme}>
      <ProfileAvatar
        theme={selectedTheme}
        resizeMode={"cover"}
        source={item.img}
      />
      <Name>{item.name}</Name>
      <CheckBox
        tintColors={{ true: selectedTheme.text, false: selectedTheme.text }}
        onCheckColor={selectedTheme.bg3}
        value={active}
        onChange={() => setActive(!active)}
      />
    </Profile>
  );
};

export default PROFILE_COMPONENT;

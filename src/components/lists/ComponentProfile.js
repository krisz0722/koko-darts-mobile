import React, { useContext, useState } from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components";
import { BasicText, FlexRowAround, Window } from "../../styles/css_mixins";
import CheckBox from "@react-native-community/checkbox";
import { ThemeContext } from "../../contexts/ThemeContext";
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
  const { theme } = useContext(ThemeContext);

  const [active, setActive] = useState(false);

  const toggleChecked = (item) => {
    //use ASyncStorage here
    setActive(!active);
  };

  return (
    <Profile theme={theme}>
      <ProfileAvatar theme={theme} resizeMode={"cover"} source={item.img} />
      <Name>{item.key}</Name>
      <CheckBox
        tintColors={{ true: theme.text, false: theme.text }}
        onCheckColor={theme.bg3}
        value={active}
        onChange={() => toggleChecked(item)}
      />
    </Profile>
  );
};

export default PROFILE_COMPONENT;

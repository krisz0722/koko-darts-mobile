import React, { useContext } from "react";
import styled from "styled-components";
import { SettingsContext } from "../../contexts/SettingsContext";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BasicTextBold,
  FlexColAround,
  FlexRowBetween,
  Window,
} from "../../styles/css_mixins";

const Options = styled(View)`
  width: 50%;
  height: 70%;
  ${FlexColAround}
`;

const Option = styled(View)`
  height: 6%;
  width: 30%;
  ${FlexRowBetween};
`;

const Label = styled(Text)`
  ${BasicTextBold}
  height: 100%;
  width: 50%;
`;

const Radio = styled(TouchableOpacity)`
  border-radius: ${() => (Window.height * 0.075) / 3};
  background-color: ${({ active, theme }) =>
    active ? theme.bg3 : "transparent"};
  border-color: ${({ theme }) => theme.bg1};
  border-width: ${({ theme }) => theme.borderWidth};
  height: ${() => (Window.height * 0.075) / 3};
  width: ${() => (Window.height * 0.075) / 3};
`;

const RADIO_BUTTON_SET = ({ OPTIONS, action, activeValue }) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <Options>
      {OPTIONS.map((item) => (
        <Option key={item}>
          <Label>{item}</Label>
          <Radio
            onPress={() => action(item)}
            active={activeValue === item}
            theme={selectedTheme}
          />
        </Option>
      ))}
    </Options>
  );
};

export default RADIO_BUTTON_SET;

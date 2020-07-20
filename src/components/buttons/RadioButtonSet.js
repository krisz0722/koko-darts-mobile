import React, { useContext } from "react";
import styled from "styled-components";
import { SettingsContext } from "../../contexts/SettingsContext";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import {
  BasicTextBold,
  FlexAround,
  FlexRowAround,
  FlexRowBetween,
  Window,
} from "../../styles/css_mixins";

const Options = styled(View)`
  width: ${({ direction }) => (direction === "vertical" ? "40%" : "100%")};
  height: 70%;
  ${FlexAround};
  flex-direction: ${({ direction }) =>
    direction === "horizontal" ? "row" : "column"};
`;

const Option = styled(TouchableHighlight)`
  border-radius: 4px;
  height: ${({ length, direction }) =>
    direction === "vertical" ? 100 / length + "%" : "100%"};
  width: ${({ length, direction }) =>
    direction === "vertical" ? "100%" : 100 / length + "%"};
  ${FlexRowBetween};
  ${FlexRowAround};
`;

const Label = styled(Text)`
  ${BasicTextBold};
  height: 100%;
  width: 50%;
  color: ${({ theme }) => theme.bg1};
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

const RADIO_BUTTON_SET = ({
  options,
  action,
  activeValue,
  direction,
  length,
}) => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <Options direction={direction}>
      {options.map((item) => (
        <Option
          underlayColor={selectedTheme.text}
          direction={direction}
          length={length}
          key={item}
          onPress={() => action(item)}
        >
          <>
            <Label>{item}</Label>
            <Radio
              onPress={() => action(item)}
              active={activeValue === item}
              theme={selectedTheme}
            />
          </>
        </Option>
      ))}
    </Options>
  );
};

export default RADIO_BUTTON_SET;

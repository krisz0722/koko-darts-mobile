import React, { useContext } from "react";
import styled from "styled-components";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import {
  BasicTextBold,
  FlexAround,
  FlexRowAround,
  Window,
} from "../../styles/css_mixins";
import { ThemeContext } from "../../contexts/ThemeContext";

const Options = styled(View)`
  width: ${({ direction }) => (direction === "column" ? "40%" : "100%")};
  height: ${({ direction }) => (direction === "column" ? "70%" : "40%")};
  ${FlexAround};
  flex-direction: ${({ direction }) => direction};
`;

const Option = styled(TouchableHighlight)`
  border-radius: 4px;
  height: ${({ length, direction }) =>
    direction === "column" ? 100 / length + "%" : "60%"};
  width: ${({ length, direction }) =>
    direction === "column" ? "100%" : 100 / length + "%"};
  ${FlexRowAround};
  flex-direction: ${({ direction }) =>
    direction === "column" ? "row" : "column-reverse"};
  justify-content: space-around;
`;

const Label = styled(Text)`
  ${BasicTextBold};
  height: 50%;
  width: ${({ direction }) => (direction === "column" ? "50%" : "90%")};
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
  const { theme } = useContext(ThemeContext);

  return (
    <Options direction={direction}>
      {options.map((item) => (
        <Option
          underlayColor={theme.text}
          direction={direction}
          length={length}
          key={item}
          onPress={() => action(item)}
        >
          <>
            <Label direction={direction}>{item}</Label>
            <Radio
              onPress={() => action(item)}
              active={activeValue === item}
              theme={theme}
            />
          </>
        </Option>
      ))}
    </Options>
  );
};

export default RADIO_BUTTON_SET;

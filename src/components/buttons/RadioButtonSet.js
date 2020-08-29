import React, { useContext } from "react";
import styled from "styled-components";
import { View, Text, TouchableHighlight } from "react-native";
import {
  BasicTextBold,
  FlexAround,
  FlexRowAround,
} from "../../styles/css_mixins";
import { ThemeContext } from "../../contexts/ThemeContext";
import CheckBox from "@react-native-community/checkbox";

const Options = styled(View)`
  width: ${({ direction }) => (direction === "row" ? "100%" : "40%")};
  height: ${({ direction }) => (direction === "row" ? "25%" : "70%")};
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
  background-color: ${({ theme, active }) =>
    active ? theme.bgGreen : "transparent"};
`;

const Label = styled(Text)`
  ${BasicTextBold};
  height: 50%;
  width: ${({ direction }) => (direction === "column" ? "50%" : "90%")};
  color: ${({ theme, active, direction }) =>
    active || direction === "row" ? theme.text : theme.bg1};
  font-size: 15;
`;

const RADIO_BUTTON_SET = ({
  options,
  action,
  activeValue,
  direction,
  length,
  rematch = false,
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
          active={activeValue === item}
        >
          <>
            <Label
              active={activeValue === item}
              rematch={rematch}
              direction={direction}
            >
              {item}
            </Label>
            <CheckBox
              disabled={true}
              onChange={() => action(item)}
              tintColors={{
                true: theme.text,
                false: direction === "row" ? theme.text : theme.bg1,
              }}
              value={activeValue === item}
              theme={theme}
              onCheckColor={theme.bg1}
            />
          </>
        </Option>
      ))}
    </Options>
  );
};

export default RADIO_BUTTON_SET;

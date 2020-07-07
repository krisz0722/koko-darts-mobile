import { css } from "styled-components";
import { Dimensions } from "react-native";

export const transition_duration = {
  default: "0.3s",
  contrast: "0.3s",
  elegant: "0.5s",
  flamboyant: "0.6s",
};

export const transition_easing = {
  default: "linear",
  contrast: "cubic-bezier(0.76, 0, 0.24, 1)",
  elegant: "linear",
  flamboyant: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
};

export const createTransition = (arr, theme, bool = false) => {
  const duration = transition_duration[theme];
  const easing = transition_easing[theme];
  const len = arr.length - 1;
  const delay = (p) => (arr.indexOf(p) === len ? bool : "");

  return arr.map((p) => `${p} ${duration} ${easing} ${delay(p)}`).join(", ");
};

export const Absolute = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Window = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width,
};

export const Screen = {
  height: Dimensions.get("screen").height,
  width: Dimensions.get("screen").width,
};

export const Resize = (attribute, percentage = 1) => {
  console.log(attribute, percentage);
  return attribute * percentage;
};

export const AlignText = css`
  text-align-vertical: center;
  text-align: center;
`;

export const FlexCol = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FlexRow = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

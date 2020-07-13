import { Easing } from "react-native";
import { HeaderStyleInterpolators } from "@react-navigation/stack";

const configDefault = {
  animation: "timing",
  config: {
    duration: 300,
    easing: Easing.linear,
  },
};

const transitionDefault = {
  transitionSpec: {
    open: configDefault,
    close: configDefault,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        opacity: next
          ? next.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            })
          : current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
      },
    };
  },
};

export default transitionDefault;

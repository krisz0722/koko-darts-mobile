import { Easing } from "react-native";
import { HeaderStyleInterpolators } from "@react-navigation/stack";

const configContrast = {
  animation: "timing",
  config: {
    duration: 300,
    easing: Easing.bezier(0.76, 0, 0.24, 1),
  },
};

const transitionContrast = {
  transitionSpec: {
    open: configContrast,
    close: configContrast,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, layouts.screen.width * -1],
                })
              : current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 1],
                }),
          },
        ],
      },
    };
  },
};

export default transitionContrast;

const configDefault = {
  animation: "timing",
  config: {
    duration: 0,
  },
};

const transitionNone = {
  transitionSpec: {
    open: configDefault,
    close: configDefault,
  },
  cardStyleInterpolator: ({ current, next }) => {
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

export default transitionNone;

const createAnimation = (
  theme,
  animation,
  backgroundColor = false,
  color = false,
  borderColor = false,
) => {
  const newBg = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.game.p2Bg, theme.game.p1Bg],
  });

  const newBorderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.game.p2Border, theme.game.p1Border],
  });

  const newTextColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.game.p2Text, theme.game.p1Text],
  });

  const style = {};

  if (backgroundColor) {
    style.backgroundColor = newBg;
  }

  if (color) {
    style.color = newTextColor;
  }

  if (borderColor) {
    style.borderColor = newBorderColor;
  }

  return style;
};

export default createAnimation;

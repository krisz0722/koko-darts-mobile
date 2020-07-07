export const toggle_animation = (state, bool) => {
  const { selectedTheme } = state;
  const { game } = selectedTheme;

  return {
    ...state,
    animation: bool,
    selectedTheme: {
      ...selectedTheme,
      transition: bool ? selectedTheme.transition : null,
      transitionDuration: bool ? selectedTheme.transitionDuration : null,
      transitionEasing: bool ? selectedTheme.transitionEasing : null,

      game: {
        ...game,
        transition: bool ? game.transition : null,
      },
    },
  };
};


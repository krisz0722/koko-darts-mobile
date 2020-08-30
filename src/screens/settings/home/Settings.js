import React, { useCallback, useContext, useEffect, useState } from "react";
import { SettingsBottom, SettingsBottomButtons } from "./StyledSettings";
import { SettingsContext } from "../../../contexts/SettingsContext";
import OPTIONS_LAYOUT from "../OptionsLayout";
import OPTIONS_COLOR from "../OptionsColor";
import OPTIONS_EFFECT from "../OptionsEffects";
import OPTIONS_SCORE from "../OptionsScore";
import OPTIONS_LEGORSET from "../OptionsLegOrSet";
import THEMED_BUTTON from "../../../components/buttons/ThemedButton";
import PREVIEW from "../Preview";
import { useIsFocused } from "@react-navigation/native";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Authcontext } from "../../../contexts/AuthContext";
import updateAuthSettings from "../../../contexts/actions/authContext/UpdateSettings";

const SETTINGS = React.memo(() => {
  const {
    dispatchSettings,
    settings,
    settings: { p1, p2 },
  } = useContext(SettingsContext);
  const {
    themeContext,
    themeContext: { background, selectedTheme },
    dispatchTheme,
  } = useContext(ThemeContext);

  const {
    userData,
    userData: { username },
  } = useContext(Authcontext);
  const USER_SETTINGS = userData.settings;

  const [preview, setPreview] = useState(false);

  const [legOrSet, setLegOrSet] = useState(settings.legOrSet);
  const [startingScore, setStartingScore] = useState(settings.startingScore);
  const [layout, setLayout] = useState(settings.layout);

  const [toWin, setTowin] = useState(settings.toWin);
  const [legsPerSet, setLegsPerSet] = useState(settings.legsPerSet);
  const [opacity, setOpacity] = useState(settings.opacity);
  const [animation, setStateAnimation] = useState(settings.animation);

  const newSettings = {
    p1,
    p2,
    legOrSet,
    startingScore,
    layout,
    toWin,
    legsPerSet,
    opacity,
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
    } else {
      const newSettings = {
        p1,
        p2,
        legOrSet,
        startingScore,
        layout,
        preview,
        toWin,
        legsPerSet,
        opacity,
        animation,
        theme: selectedTheme,
        background,
      };
      dispatchSettings({
        type: "SAVE_SETTINGS",
        value: newSettings,
      });
      updateAuthSettings(userData, newSettings);
    }
  }, [
    background,
    userData,
    selectedTheme,
    username,
    p1,
    p2,
    isFocused,
    dispatchSettings,
    legOrSet,
    startingScore,
    layout,
    preview,
    toWin,
    legsPerSet,
    opacity,
    animation,
    dispatchTheme,
  ]);

  const togglePreview = useCallback(() => {
    setPreview(!preview);
  }, [preview, setPreview]);

  const toggleLayout = useCallback(
    (value) => {
      setLayout(value);
    },
    [setLayout],
  );

  const toggleLegOrSet = useCallback(
    (value) => {
      setLegOrSet(value);
    },
    [setLegOrSet],
  );

  const toggleStartingScore = useCallback(
    (value) => {
      setStartingScore(value);
    },
    [setStartingScore],
  );

  const toggleToWin = useCallback(
    (value) => {
      setTowin(value);
    },
    [setTowin],
  );

  const toggleLegsPerSet = useCallback(
    (value) => {
      setLegsPerSet(value);
    },
    [setLegsPerSet],
  );

  const toggleAnimation = useCallback(() => {
    setStateAnimation(!animation);
  }, [animation, setStateAnimation]);

  const toggleBackground = useCallback(() => {
    dispatchTheme({ type: "CHANGE_BACKGROUND", value: !background });
  }, [dispatchTheme, background]);

  const toggleOpacity = useCallback(() => {
    setOpacity(!opacity);
  }, [opacity, setOpacity]);

  const toggleTheme = useCallback(
    (value) => {
      dispatchTheme({ type: "CHANGE_THEME", value });
    },
    [dispatchTheme],
  );

  const reset = useCallback(() => {
    const {
      layout,
      legOrSet,
      startingScore,
      animation,
      opacity,
      toWin,
      legsPerSet,
      theme,
      background,
    } = USER_SETTINGS;

    setPreview(false);
    setLayout(layout);
    setLegsPerSet(legsPerSet);
    setStateAnimation(animation);
    setOpacity(opacity);
    setTowin(toWin);
    setLegOrSet(legOrSet);
    setStartingScore(startingScore);
    dispatchTheme({
      type: "LOAD_THEME",
      value: { ...themeContext, background, selectedTheme: theme },
    });
    dispatchSettings({ type: "RESET", value: USER_SETTINGS });
  }, [USER_SETTINGS, themeContext, dispatchTheme, dispatchSettings]);

  return (
    <>
      <OPTIONS_LAYOUT layout={layout} toggleLayout={toggleLayout} />
      <OPTIONS_COLOR toggleTheme={toggleTheme} />
      <OPTIONS_EFFECT
        animation={animation}
        opacity={opacity}
        background={background}
        toggleAnimation={toggleAnimation}
        toggleOpacity={toggleOpacity}
        toggleBackground={toggleBackground}
      />
      <OPTIONS_SCORE
        page={"main"}
        startingScore={startingScore}
        toggleStartingScore={toggleStartingScore}
      />
      <OPTIONS_LEGORSET
        page={"main"}
        animation={animation}
        legOrSet={legOrSet}
        toggleLegOrSet={toggleLegOrSet}
        toWin={toWin}
        toggleToWin={toggleToWin}
        legsPerSet={legsPerSet}
        toggleLegsPerSet={toggleLegsPerSet}
      />
      <SettingsBottom preview={preview}>
        <PREVIEW
          animation={animation}
          settings={newSettings}
          preview={preview}
          ingame={false}
          layout={layout}
        />
        <SettingsBottomButtons>
          <THEMED_BUTTON
            size={"small"}
            text={preview ? "hide preview" : "show preview"}
            type={"success"}
            length={2}
            action={togglePreview}
          />
          <THEMED_BUTTON
            type={"danger"}
            size={"small"}
            text={"reset"}
            length={2}
            action={reset}
          />
        </SettingsBottomButtons>
      </SettingsBottom>
    </>
  );
});

export default SETTINGS;

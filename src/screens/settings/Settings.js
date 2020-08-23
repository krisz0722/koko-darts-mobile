import React, { useCallback, useContext, useEffect, useState } from "react";
import { Bottom, BottomButtons } from "./StyledSettings";
import { SettingsContext } from "../../contexts/SettingsContext";
import { OptionsLayout } from "./OptionsLayout";
import { COLOR } from "./OptionsColor";
import { OptionsEffects } from "./OptionsEffects";
import { OptionsScore } from "./OptionsScore";
import { OptionsLegOrSet } from "./OptionsLegOrSet";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import PREVIEW from "./Preview";
import { useIsFocused } from "@react-navigation/native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Authcontext } from "../../contexts/AuthContext";
import updateAuthSettings from "../../contexts/actions/authContext/UpdateSettings";

const SETTINGS = () => {
  const {
    dispatchSettings,
    settings,
    settings: { p1, p2 },
  } = useContext(SettingsContext);
  const {
    setBackground,
    background,
    setAnimation,
    selectedTheme,
    setSelectedTheme,
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
      setAnimation(animation);
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
    setAnimation,
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
    setBackground(!background);
  }, [setBackground, background]);

  const toggleOpacity = useCallback(() => {
    setOpacity(!opacity);
  }, [opacity, setOpacity]);

  const toggleTheme = useCallback(
    (value) => {
      setSelectedTheme(value);
    },
    [setSelectedTheme],
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
    setSelectedTheme(theme);
    setBackground(background);
    dispatchSettings({ type: "RESET", value: USER_SETTINGS });
  }, [USER_SETTINGS, setBackground, setSelectedTheme, dispatchSettings]);

  return (
    <>
      <OptionsLayout layout={layout} toggleLayout={toggleLayout} />
      <COLOR toggleTheme={toggleTheme} />
      <OptionsEffects
        animation={animation}
        opacity={opacity}
        background={background}
        toggleAnimation={toggleAnimation}
        toggleOpacity={toggleOpacity}
        toggleBackground={toggleBackground}
      />
      <OptionsScore
        page={"main"}
        startingScore={startingScore}
        toggleStartingScore={toggleStartingScore}
      />
      <OptionsLegOrSet
        page={"main"}
        animation={animation}
        legOrSet={legOrSet}
        toggleLegOrSet={toggleLegOrSet}
        toWin={toWin}
        toggleToWin={toggleToWin}
        legsPerSet={legsPerSet}
        toggleLegsPerSet={toggleLegsPerSet}
      />
      <Bottom preview={preview}>
        <PREVIEW
          animation={animation}
          settings={newSettings}
          preview={preview}
          ingame={false}
          layout={layout}
        />
        <BottomButtons>
          <THEMED_BUTTON
            size={"small"}
            icon={preview ? "visibility-off" : "visibility"}
            text={preview ? "hide preview" : "show preview"}
            type={"success"}
            length={2}
            action={togglePreview}
          />
          <THEMED_BUTTON
            type={"danger"}
            size={"small"}
            icon={"undo"}
            text={"reset"}
            length={2}
            action={reset}
          />
        </BottomButtons>
      </Bottom>
    </>
  );
};

export default SETTINGS;

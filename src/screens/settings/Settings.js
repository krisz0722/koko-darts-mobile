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
import { updateSettings } from "../../fb/crud";

const SETTINGS = () => {
  const {
    dispatchSettings,
    settings,
    settings: { p1, p2 },
  } = useContext(SettingsContext);
  const {
    setBackground,
    setAnimation,
    selectedTheme,
    setSelectedTheme,
  } = useContext(ThemeContext);

  const {
    userData,
    userData: { username },
    dispatchUserData,
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
      };
      dispatchSettings({
        type: "SAVE_SETTINGS",
        value: newSettings,
      });
      dispatchUserData({
        type: "UPDATE_SETTINGS",
        value: newSettings,
      });
      setAnimation(animation);
      updateSettings(username, { ...newSettings, theme: selectedTheme });
    }
  }, [
    dispatchUserData,
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

  const toggleOpacity = useCallback(() => {
    setOpacity(!opacity);
  }, [opacity, setOpacity]);

  const reset = useCallback(() => {
    const {
      layout,
      legOrSet,
      startingScore,
      animation,
      opacity,
      toWin,
      legsPerSet,
    } = USER_SETTINGS;

    setPreview(false);
    setLayout(layout);
    setLegsPerSet(legsPerSet);
    setStateAnimation(animation);
    setOpacity(opacity);
    setTowin(toWin);
    setLegOrSet(legOrSet);
    setStartingScore(startingScore);

    dispatchSettings({ type: "RESET", value: newSettings });
    setSelectedTheme(USER_SETTINGS.theme);
    setBackground(true);
  }, [
    setBackground,
    setSelectedTheme,
    dispatchSettings,
    newSettings,
    USER_SETTINGS,
  ]);

  return (
    <>
      <OptionsLayout layout={layout} toggleLayout={toggleLayout} />
      <COLOR />
      <OptionsEffects
        animation={animation}
        toggleAnimation={toggleAnimation}
        opacity={opacity}
        toggleOpacity={toggleOpacity}
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

// TODO animation toggle, visual effecet info modal or tooltip, ASYM component, PREVIEW visibilityi icon
// TODO reset has to set the users saved settins to default in the database too

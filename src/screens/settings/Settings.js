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

const SETTINGS = () => {
  const {
    dispatchSettings,
    settings: { p1, p2 },
  } = useContext(SettingsContext);
  const { setBackground, setAnimation, setSelectedTheme } = useContext(
    ThemeContext,
  );

  //axios DB get

  const USER_SETTINGS = {
    layout: "classic",
    theme: "default",
    legOrSet: "set",
    toWin: 3,
    legsPerSet: 3,
    startingScore: 501,
    opacity: true,
    animation: true,
  };

  const [preview, setPreview] = useState(false);

  const [legOrSet, setLegOrSet] = useState(USER_SETTINGS.legOrSet);
  const [startingScore, setStartingScore] = useState(
    USER_SETTINGS.startingScore,
  );
  const [layout, setLayout] = useState(USER_SETTINGS.layout);

  const [toWin, setTowin] = useState(USER_SETTINGS.toWin);
  const [legsPerSet, setLegsPerSet] = useState(USER_SETTINGS.legsPerSet);
  const [opacity, setOpacity] = useState(USER_SETTINGS.opacity);
  const [animation, setStateAnimation] = useState(USER_SETTINGS.animation);

  const isFocused = useIsFocused();

  console.log("ISFOCUSED", isFocused);

  useEffect(() => {
    if (isFocused) {
      console.log("SETTINGS FOCUSED");
    } else {
      console.log("NOT FOCUSED!!!");
      dispatchSettings({
        type: "SAVE_SETTINGS",
        value: {
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
        },
      });
      console.log("animation TOGGLING");
      setAnimation(animation);
    }
  }, [
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

    dispatchSettings({ type: "RESET", value: USER_SETTINGS });
    setSelectedTheme(USER_SETTINGS.theme);
    setBackground(true);
  }, [setSelectedTheme, dispatchSettings, USER_SETTINGS]);

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

  useEffect(() => {
    console.log("effect");
  }, []);

  console.log("RENDER SETTINGS SCREEN");

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
          startingScore={startingScore}
          legOrSet={legOrSet}
          layout={layout}
          opacity={opacity}
          preview={preview}
          ingame={false}
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

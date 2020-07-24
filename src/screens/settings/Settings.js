import React, { useCallback, useContext, useEffect, useState } from "react";
import { Bottom, BottomButtons, Options } from "./StyledSettings";
import { SettingsContext } from "../../contexts/SettingsContext";
import { OptionsLayout } from "../../components/settings/OptionsLayout";
import { COLOR } from "../../components/settings/OptionsColor";
import { OptionsEffects } from "../../components/settings/OptionsEffects";
import { OptionsScore } from "../../components/settings/OptionsScore";
import { OptionsLegOrSet } from "../../components/settings/OptionsLegOrSet";
import THEMED_BUTTON from "../../components/buttons/ThemedButton";
import PREVIEW from "../../components/settings/Preview";
import { useIsFocused } from "@react-navigation/native";

const SETTINGS = () => {
  const { dispatchSettings } = useContext(SettingsContext);

  const USER_SETTINGS = {
    layout: "classic",
    legOrSet: "set",
    toWin: 3,
    legsPerSet: 3,
    startingScore: 501,
    opacity: true,
    animation: true,
  };

  const [legOrSet, setLegOrSet] = useState("leg");
  const [startingScore, setStartingScore] = useState(501);
  const [layout, setLayout] = useState("classic");
  const [preview, setPreview] = useState(false);
  const [toWin, setTowin] = useState(3);
  const [legsPerSet, setLegsPerSet] = useState(3);
  const [opacity, setOpacity] = useState(true);
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    return () => {
      console.log(
        "Behavior right before the component is removed from the DOM.",
      );
    };
  }, []);

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
    }
  }, [
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
    setAnimation(animation);
    setOpacity(opacity);
    setTowin(toWin);
    setLegOrSet(legOrSet);
    setStartingScore(startingScore);

    dispatchSettings({ type: "RESET", value: USER_SETTINGS });
  }, [dispatchSettings, USER_SETTINGS]);

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
    setAnimation(!animation);
  }, [animation, setAnimation]);

  const toggleOpacity = useCallback(() => {
    setOpacity(!opacity);
  }, [opacity, setOpacity]);

  useEffect(() => {
    console.log("effect");
  }, []);

  console.log("RENDER SETTINGS SCREEN");

  return (
    <>
      <Options>
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
      </Options>
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

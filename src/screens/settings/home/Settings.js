import React, { useCallback, useContext, useState } from "react";
import { SettingsBottom, SettingsBottomButtons } from "./StyledSettings";
import { SettingsContext } from "../../../contexts/SettingsContext";
import OPTIONS_LAYOUT from "../OptionsLayout";
import OPTIONS_COLOR from "../OptionsColor";
import OPTIONS_EFFECT from "../OptionsEffects";
import OPTIONS_SCORE from "../OptionsScore";
import OPTIONS_LEGORSET from "../OptionsLegOrSet";
import THEMED_BUTTON from "../../../components/buttons/ThemedButton";
import PREVIEW from "../Preview";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Authcontext } from "../../../contexts/AuthContext";
import fetchPost from "../../../utils/fetchPost";

const SETTINGS = React.memo(() => {
  const {
    dispatchSettings,
    settings,
    settings: { p1, p2 },
  } = useContext(SettingsContext);
  const {
    themeContext: { background, selectedTheme },
    dispatchTheme,
  } = useContext(ThemeContext);

  const {
    userData: { username },
  } = useContext(Authcontext);

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

  const reset = useCallback(async () => {
    try {
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
      await dispatchSettings({
        type: "SAVE_SETTINGS",
        value: newSettings,
      });
      await fetchPost("api/updatesettings", { username, newSettings });
    } catch (err) {
      console.log(err);
      alert("ERROR WHILE SAVING SETTINGS: " + err);
    }
  }, [
    username,
    background,
    selectedTheme,
    p1,
    p2,
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
            text={"save"}
            length={2}
            action={reset}
          />
        </SettingsBottomButtons>
      </SettingsBottom>
    </>
  );
});

export default SETTINGS;

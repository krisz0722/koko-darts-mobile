import React, { useContext, useState } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { View_Headers } from "../components/containers/Styled_Welcome";
import { Text_Title } from "../components/Headers";

export const PROFILE = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <>
      <View_Headers>
        <Text_Title theme={selectedTheme}>PROFILE</Text_Title>
      </View_Headers>
    </>
  );
};

import React, { useContext, useState } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { View_Headers } from "../components/containers/Styled_Welcome";
import {
  Text_Title,
  Text_Subtitle,
  Text_Subtitle2,
} from "../components/Headers";

export const HOME = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <>
      <View_Headers>
        <Text_Title theme={selectedTheme}>HOME</Text_Title>
        <Text_Subtitle theme={selectedTheme}>HOME</Text_Subtitle>
        <Text_Subtitle2 theme={selectedTheme}>HOME</Text_Subtitle2>
      </View_Headers>
    </>
  );
};

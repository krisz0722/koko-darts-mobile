import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { Text, View } from "react-native";

export const PROFILE = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <>
      <View>
        <Text theme={selectedTheme}>PROFILE</Text>
      </View>
    </>
  );
};

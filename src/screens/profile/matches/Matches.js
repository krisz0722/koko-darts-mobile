import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import { SettingsContext } from "../../../contexts/SettingsContext";
import LIST_MATCHES from "./ListMatches";

const MATCHES = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LIST_MATCHES />
    </SafeAreaView>
  );
};

export default MATCHES;

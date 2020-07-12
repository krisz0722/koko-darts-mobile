import React, { useEffect, useContext, useRef, useState } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { View_Headers } from "../components/containers/Welcome";
import {
  Text_Title,
  Text_Subtitle,
  Text_Subtitle2,
} from "../components/Headers";
import { View, Animated, Button } from "react-native";

export const HOME = () => {
  const {
    settings: { selectedTheme },
  } = useContext(SettingsContext);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isEditing ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [isEditing]);

  const opacity = useRef(new Animated.Value(0)).current;

  const saveButtonOpacity = opacity.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1],
  });

  Animated.timing(opacity, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();

  const AnimatedHeader = Animated.createAnimatedComponent(View_Headers);

  console.log(saveButtonOpacity);

  return (
    <>
      <AnimatedHeader bg={"blue"} style={{ opacity: saveButtonOpacity }}>
        <Animated.Text
          style={{
            width: "50%",
            borderColor: "white",
            borderWidth: 2,
            opacity: saveButtonOpacity,
          }}
        >
          Animated
        </Animated.Text>
      </AnimatedHeader>
      <View>
        <Button onPress={() => setIsEditing(!isEditing)} title={"press"} />
      </View>
    </>
  );
};

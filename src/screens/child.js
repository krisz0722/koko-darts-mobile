import React, { useEffect, useContext, useRef, useState } from "react";
import { View, Animated, Button, Text } from "react-native";
export const CHILDIZE = React.memo((props) => {
  console.log("render");
  return (
    <View style={{ backgroundColor: "green", width: 50, height: 50 }}>
      <Text>{props.b}</Text>
    </View>
  );
});

import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Opponent, Name, OpponentAvatar } from "./StyledComponentProfile";

const OPPONENT_COMPONENT = ({ chooseProfile, opponent, item }) => {
  const { theme } = useContext(ThemeContext);

  const active = opponent ? opponent.id === item.id : false;

  return (
    <Opponent active={active} onPress={() => chooseProfile(item)} theme={theme}>
      {item.img === "" ? (
        <OpponentAvatar
          theme={theme}
          resizeMode={"cover"}
          source={require("../../../assets/bg.png")}
        />
      ) : (
        <OpponentAvatar
          theme={theme}
          resizeMode={"cover"}
          source={{ uri: item.img }}
        />
      )}

      <Name active={active}>{item.key}</Name>
    </Opponent>
  );
};

export default OPPONENT_COMPONENT;

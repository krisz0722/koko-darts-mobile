import React, { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Opponent, OpponentAvatar, Name } from "./StyledComponentProfile";

const PROFILE_COMPONENT = React.memo(({ item, add, remove }) => {
  const { theme } = useContext(ThemeContext);

  const [active, setActive] = useState(false);

  const toggleChecked = (val) => {
    if (active) {
      setActive(false);
      remove(val);
    } else {
      setActive(true);
      add(val);
    }
  };

  return (
    <Opponent active={active} onPress={() => toggleChecked(item)} theme={theme}>
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

      <Name active={active}>{item.username}</Name>
    </Opponent>
  );
});

export default PROFILE_COMPONENT;

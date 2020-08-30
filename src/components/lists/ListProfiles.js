import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import PROFILE_COMPONENT from "./ComponentProfile";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProfilesContainer, Safe } from "./StyledListProfiles";

const LIST_PROFILES = React.memo(({ add, remove, profiles }) => {
  const { theme } = useContext(ThemeContext);

  const renderItem = ({ item }) => (
    <PROFILE_COMPONENT add={add} remove={remove} item={item.data()} />
  );

  return (
    <Safe>
      <>
        {!profiles ? (
          <ActivityIndicator color={theme.text} size={"large"} />
        ) : profiles.length === 0 ? null : (
          <ProfilesContainer
            data={profiles}
            renderItem={renderItem}
            keyExtractor={(item) => item.data().username}
            theme={theme}
          />
        )}
      </>
    </Safe>
  );
});

export default LIST_PROFILES;

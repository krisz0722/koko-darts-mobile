import React, { useContext } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import styled from "styled-components";
import { FlatList } from "react-native";
import PROFILE_COMPONENT from "./ComponentProfile";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FlexCol } from "../../styles/css_mixins";
export const Safe = styled(SafeAreaView)`
  height: 40%;
  width: 100%;
  ${FlexCol};
  background-color: ${({ theme }) => theme.text2};
`;

export const ProfilesContainer = styled(FlatList)`
  width: 100%;
  height: 100%;
  border-bottom-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
`;

const LIST_PROFILES = React.memo(({ add, remove, profiles, regexp }) => {
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

//TODO filter by a regExp

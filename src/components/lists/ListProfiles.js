import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import styled from "styled-components";
import { FlatList } from "react-native";
import PROFILE_COMPONENT from "./ComponentProfile";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getUsers } from "../../fb/crud";
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

const LIST_PROFILES = ({ regexp }) => {
  const { theme } = useContext(ThemeContext);

  const [profiles, setProfiles] = useState(null);

  const renderItem = ({ item }) => <PROFILE_COMPONENT item={item.data()} />;

  const PROFILES_LIST = async () => {
    try {
      const profiles = await getUsers().then((querySnapshot) => {
        console.log("PROFILES", querySnapshot.docs);
        console.log("PROFILESLIST", typeof querySnapshot.docs);
        return querySnapshot.docs;
      });
      setProfiles(profiles);
    } catch (err) {
      console.log(err);
      alert("ERROR WHILE GETTING USERS: ", err);
    }
  };

  useEffect(() => {
    PROFILES_LIST();
  }, []);

  return (
    <Safe>
      <>
        {!profiles ? (
          <ActivityIndicator color={theme.text} size={"large"} />
        ) : (
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
};

export default LIST_PROFILES;

//TODO filter by a regExp

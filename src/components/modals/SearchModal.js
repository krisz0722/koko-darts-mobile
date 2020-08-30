import React, { useContext, useEffect, useState } from "react";
import { Modal, SafeAreaView } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import LIST_PROFILES from "../lists/ListProfiles";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getUsers } from "../../_backend/db/crudGet";
import { Authcontext } from "../../contexts/AuthContext";
import updateRequests from "../../contexts/actions/authContext/UpdateRequests";
import ACTIVITY_INDICATOR from "./Activityindicator";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  ModalContainerSearch,
  Container,
  SearchBar,
  SearchInput,
} from "./StyledChoosePlayerModal";

const SEARCH_MODAL = React.memo(({ action1, visible }) => {
  const { theme, animation } = useContext(ThemeContext);

  const animationType = animation
    ? theme.name === "default"
      ? "fade"
      : "slide"
    : "none";

  const {
    userData,
    userData: { username, friends, friendRequestSent, friendRequestReceived },
  } = useContext(Authcontext);

  const [regexp, setRegexp] = useState(new RegExp(".*", "i"));
  const [profiles, setProfiles] = useState(null);
  const [filteredProfiles, setFilteredProfiles] = useState(null);
  const [checkedProfiles, setCheckedProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    if (visible) {
      (async () => {
        try {
          const profiles = await getUsers().then((querySnapshot) => {
            return querySnapshot.docs.filter((item) => {
              const profileUsername = item.data().username;
              const isFriend = () =>
                friends.find((friend) => friend.key === profileUsername);

              const hasfriendRequestSent = () =>
                friendRequestSent.find(
                  (request) => request === profileUsername,
                );
              const hasfriendRequestReceived = () =>
                friendRequestReceived.find(
                  (request) => request.username === profileUsername,
                );
              return (
                !isFriend() &&
                !hasfriendRequestSent() &&
                !hasfriendRequestReceived() &&
                profileUsername !== username &&
                profileUsername !== "GUEST"
              );
            });
          });

          profiles.sort((a, b) => {
            return b.data().username - a.data().username;
          });

          setProfiles(profiles);
          setFilteredProfiles(profiles);
        } catch (err) {
          console.log(err);
          alert("ERROR WHILE GETTING USERS: ", err);
        }
      })();
    }
  }, [visible, friendRequestReceived, friends, friendRequestSent, username]);

  const add = (item) => {
    console.log("CHECKED LIST BEFORE ADD", checkedProfiles);
    checkedProfiles.push(item.username);
    setCheckedProfiles(checkedProfiles);
    console.log("CHECKED LIST AFTER ADD", checkedProfiles);
  };

  const remove = (item) => {
    console.log("CHECKED LIST BEFORE REMOVE", checkedProfiles);
    const index = checkedProfiles.indexOf(item);
    checkedProfiles.splice(index, 1);
    setCheckedProfiles(checkedProfiles);
    console.log("CHECKED LIST AFTER REMOVE", checkedProfiles);
  };

  const sendRequest = async () => {
    setLoading(true);
    await updateRequests(userData, checkedProfiles);
    setCheckedProfiles([]);
    setLoading(false);
  };

  const back = () => {
    setCheckedProfiles([]);
    action1();
  };

  const handleRegExp = (val) => {
    if (val === "") {
      setRegexp(new RegExp(".*", "i"));
    } else {
      setRegexp(new RegExp(val, "i"));
    }
  };

  const handleSearchActive = () => {
    setSearchActive(true);
  };

  useEffect(() => {
    if (profiles) {
      const filtered = profiles.filter((item) => {
        const username = item.data().username;
        return regexp.test(username);
      });
      setFilteredProfiles(filtered);
    }

    if (!visible) {
      setSearchActive(false);
    }
  }, [visible, regexp]);

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      presentationStyle={"pageSheet"}
      visible={visible}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ModalContainerSearch
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={"always"}
          theme={theme}
        >
          <Container>
            <SearchBar active={searchActive} theme={theme}>
              <Icon
                color={searchActive ? theme.text : theme.text2}
                name={"search"}
                size={25}
              />
              <SearchInput
                active={searchActive}
                onFocus={handleSearchActive}
                placeholderTextColor={theme.text2}
                theme={theme}
                onChangeText={handleRegExp}
                placeholder={searchActive ? null : "SEARCH FOR USERS..."}
              />
              <Icon
                color={searchActive ? theme.text : theme.text2}
                name={"clear"}
                size={25}
              />
            </SearchBar>

            <LIST_PROFILES
              profiles={filteredProfiles}
              add={add}
              remove={remove}
              regexp={regexp}
            />
            <BottomButtons theme={theme}>
              <THEMED_BUTTON
                text={"back"}
                length={2}
                size={"small"}
                type={"danger"}
                action={() => back()}
              />
              <THEMED_BUTTON
                size={"small"}
                text={"send request"}
                type={"success"}
                length={2}
                icon={"send"}
                action={() => sendRequest()}
              />
            </BottomButtons>
          </Container>
        </ModalContainerSearch>
      </SafeAreaView>
      <ACTIVITY_INDICATOR
        visible={loading}
        animation={animation}
        text={
          checkedProfiles.length > 1
            ? "Sending requests..."
            : "Sending request..."
        }
        theme={theme}
        filled={true}
      />
    </Modal>
  );
});

export default SEARCH_MODAL;

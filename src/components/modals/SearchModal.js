import React, { useContext, useEffect, useState } from "react";
import { Modal, TouchableOpacity, SafeAreaView } from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import LIST_PROFILES from "../lists/ListProfiles";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Authcontext } from "../../contexts/AuthContext";
import updateRequests from "../../contexts/actions/authContext/UpdateRequests";
import ACTIVITY_INDICATOR from "./Activityindicator";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  ModalContainerSearch,
  Container,
  SearchBar,
  SearchInput,
  Error,
  ErrorMessage,
} from "./StyledChoosePlayerModal";
import fetchGet from "../../utils/fetchGet";

const SEARCH_MODAL = React.memo(({ action1, visible }) => {
  const {
    theme,
    themeContext: { animation },
  } = useContext(ThemeContext);

  const animationType = animation
    ? theme.name === "default"
      ? "fade"
      : "slide"
    : "none";

  const {
    userData,
    dispatchUserData,
    userData: { username, friends, friendRequestSent, friendRequestReceived },
  } = useContext(Authcontext);

  const [regexp, setRegexp] = useState(new RegExp(".*", "i"));
  const [profiles, setProfiles] = useState(null);
  const [filteredProfiles, setFilteredProfiles] = useState(null);
  const [checkedProfiles, setCheckedProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    if (visible) {
      (async () => {
        try {
          const profiles = await fetchGet("api/getusers").then((data) =>
            data.filter((item) => {
              const profileUsername = item.username;
              const isFriend = () =>
                friends.find((friend) => friend.key === profileUsername);

              const hasfriendRequestSent = () =>
                friendRequestSent.find(
                  (request) => request.username === profileUsername,
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
            }),
          );

          profiles.sort((a, b) => {
            return b.username - a.username;
          });
          setProfiles(profiles);
          setFilteredProfiles(profiles);
        } catch (err) {
          console.log(err);
          alert("ERROR WHILE GETTING USERS: " + err);
        }
      })();
    }
  }, [visible, friendRequestReceived, friends, friendRequestSent, username]);

  const add = (item) => {
    const { username, id } = item;
    checkedProfiles.push({ username, id });
    setCheckedProfiles(checkedProfiles);
  };

  const remove = (item) => {
    const index = checkedProfiles.indexOf(item);
    checkedProfiles.splice(index, 1);
    setCheckedProfiles(checkedProfiles);
  };

  const sendRequest = async () => {
    setLoading(true);
    const updatedProfile = await updateRequests(userData, checkedProfiles);
    setCheckedProfiles([]);
    setLoading(false);
    dispatchUserData({ type: "UPDATE_PROFILE", value: updatedProfile });
  };

  const back = () => {
    setCheckedProfiles([]);
    action1();
  };

  const handleRegExp = (val) => {
    setError(false);
    try {
      setInput(val);
      if (val === "") {
        setRegexp(new RegExp(".*", "i"));
      } else {
        setRegexp(new RegExp(val, "i"));
      }
    } catch (err) {
      setInput("");
      setRegexp(new RegExp(".*", "i"));
      setError(true);
      console.log(err);
    }
  };

  const clear = () => {
    setRegexp(new RegExp(".*", "i"));
    setInput("");
    setError(false);
  };

  const handleSearchActive = () => {
    setSearchActive(true);
  };

  useEffect(() => {
    if (profiles) {
      const filtered = profiles.filter((item) => {
        const username = item.username;
        return regexp.test(username);
      });
      setFilteredProfiles(filtered);
    }

    if (!visible) {
      setSearchActive(false);
    }
  }, [profiles, visible, regexp]);

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
            {error ? (
              <Error>
                <ErrorMessage>
                  invalid search value. don't use special characters.
                </ErrorMessage>
              </Error>
            ) : null}

            <SearchBar active={searchActive} theme={theme}>
              <Icon
                color={searchActive ? theme.text : theme.text2}
                name={"search"}
                size={theme.fonts.icon1}
              />
              <SearchInput
                active={searchActive}
                onFocus={handleSearchActive}
                placeholderTextColor={theme.text2}
                theme={theme}
                onChangeText={handleRegExp}
                value={input}
                placeholder={searchActive ? null : "SEARCH FOR USERS..."}
              />
              <TouchableOpacity onPress={clear}>
                <Icon
                  color={searchActive ? theme.text : theme.text2}
                  name={"clear"}
                  size={theme.fonts.icon1}
                />
              </TouchableOpacity>
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

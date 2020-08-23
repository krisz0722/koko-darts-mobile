import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  View,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import THEMED_BUTTON from "../buttons/ThemedButton";
import { BottomButtons } from "./StyledModal";
import LIST_PROFILES from "../lists/ListProfiles";
import {
  BasicText,
  BasicTextBold,
  FlexCol,
  Window,
} from "../../styles/css_mixins";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getUsers } from "../../fb/crud";
import { Authcontext } from "../../contexts/AuthContext";
import updateRequests from "../../contexts/actions/authContext/UpdateRequests";
import ACTIVITY_INDICATOR from "./Activityindicator";
export const ModalContainerSearch = styled(ScrollView)`
  background-color: rgba(255, 255, 255, 0.95);
`;

export const SearchBar = styled(TextInput)`
  ${BasicText}
  width: 80%;
  margin: auto;
  height: 10%;
  border-color: ${({ theme }) => theme.text2};
  border-radius: 30;
  border-width: 2;
  color: ${({ theme }) => theme.text2};
`;

export const Container = styled(View)`
  width: 100%;
  height: ${() => Window.height * 0.9};
  ${FlexCol};
`;

export const Header = styled(Text)`
${BasicTextBold}
height:10%;
width:100%;
margin:auto;
background-color: ${({ theme }) => theme.bg1};
color: ${({ theme }) => theme.text}
font-size:20;
`;

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

  const [regexp, setRegexp] = useState("");
  const [profiles, setProfiles] = useState(null);
  const [checkedProfiles, setCheckedProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      (async () => {
        try {
          const profiles = await getUsers().then((querySnapshot) => {
            console.log("PROFILES", querySnapshot.docs);
            return querySnapshot.docs.filter((item) => {
              const profileUsername = item.data().username;
              const isFriend = () =>
                friends.find((friend) => friend.key === profileUsername);

              const hasfriendRequestSent = () =>
                friendRequestSent.find(
                  (request) => request === profileUsername,
                );
              console.log("HAS REQUST SENT", hasfriendRequestSent());
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
            console.log(a.data().username, b.data().username);
            return b.data().username - a.data().username;
          });

          setProfiles(profiles);
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

  const handleRegExp = (val) => setRegexp(val);

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
            <Header>FIND YOUR FRIEND</Header>
            <SearchBar
              placeholderTextColor={theme.borderColor}
              theme={theme}
              onChangeText={handleRegExp}
            />
            <LIST_PROFILES
              profiles={profiles}
              add={add}
              remove={remove}
              regexp={regexp}
            />
            <BottomButtons theme={theme}>
              <THEMED_BUTTON
                text={"back"}
                length={2}
                size={"small"}
                icon={"arrow-back"}
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

// TODO keyboard avoiding view... or just simply put it in a scrollview
// TODO icons and button titles

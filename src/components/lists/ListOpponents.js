import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import OPPONENT_COMPONENT from "./ComponentOpponent";
import { Authcontext } from "../../contexts/AuthContext";
import { Safe, ProfilesContainer } from "./StyledListProfiles";

const LIST_OPPONENTS = React.memo(({ opponent, chooseProfile }) => {
  const { theme } = useContext(ThemeContext);
  const {
    userData: { friends, unfinishedMatches },
  } = useContext(Authcontext);
  const FRIENDS_LIST = friends.filter((friend) => {
    const hasUnfinished = unfinishedMatches.find((match) => {
      return match.opponent === friend.key;
    });
    const isGuest = friend.key === "GUEST";
    const isDeleted = friend.key === "DELETED USER";

    return !hasUnfinished && !isGuest && !isDeleted && !friend.inGame;
  });

  const renderItem = ({ item }) => (
    <OPPONENT_COMPONENT
      opponent={opponent}
      chooseProfile={chooseProfile}
      item={item}
    />
  );

  return (
    <Safe>
      <ProfilesContainer
        data={FRIENDS_LIST}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        theme={theme}
      />
    </Safe>
  );
});

export default LIST_OPPONENTS;

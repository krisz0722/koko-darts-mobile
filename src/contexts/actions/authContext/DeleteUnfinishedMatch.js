import navigatingOut from "../../../utils/navigatingOut";
import navigatingIn from "../../../utils/navigatingIn";
import fetchPost from "../../../utils/fetchPost";

const deleteMatch = async (
  gameData,
  username,
  inGame,
  navigation,
  navigationType,
) => {
  const {
    key,
    settings: { p1, p2 },
  } = gameData;

  navigatingIn(navigation, navigationType);

  await fetchPost("api/updateunfinishedmatches", {
    p1,
    p2,
    p1Match: null,
    p2Match: null,
    type: "delete",
    key,
    inGame,
    gameData: null,
  });

  navigatingOut(navigation, navigationType, gameData);
};

export default deleteMatch;

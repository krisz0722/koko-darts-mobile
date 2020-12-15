import navigatingOut from "../../../utils/navigatingOut";
import navigatingIn from "../../../utils/navigatingIn";
import fetchPost from "../../../utils/fetchPost";

const deleteMatch = async (
  gameData,
  id,
  inGame,
  navigation,
  navigationType,
) => {
  const {
    key,
    settings: { p1, p2 },
  } = gameData;

  navigatingIn(navigation, navigationType);

  const updatedUserData = await fetchPost("api/updateunfinishedmatches", {
    p1,
    p2,
    p1Match: null,
    p2Match: null,
    type: "delete",
    key,
    inGame,
    gameData: null,
    id,
  });
  navigatingOut(navigation, navigationType, gameData);
  console.log("delete match", updatedUserData);
  return updatedUserData;
};

export default deleteMatch;

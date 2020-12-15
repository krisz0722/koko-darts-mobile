import fetchPost from "../../../utils/fetchPost";
import navigatingIn from "../../../utils/navigatingIn";
import navigatingOut from "../../../utils/navigatingOut";

const updateAuthMatchesSave = async (
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

  const matchToSave = (player) => {
    const opponent = p1.id === player.id ? p2 : p1;
    return {
      ...gameData,
      opponent,
      initializedBy: id,
    };
  };
  console.log("save match id", id);
  navigatingIn(navigation, navigationType, gameData);

  const updatedUserData = await fetchPost("api/updateunfinishedmatches", {
    p1,
    p2,
    p1Match: matchToSave(p1),
    p2Match: matchToSave(p2),
    type: "save",
    key,
    inGame,
    gameData: null,
    id,
  });
  navigatingOut(navigation, navigationType, gameData);
  console.log("updatematchsave, type save", updatedUserData);
  return updatedUserData;
};

export default updateAuthMatchesSave;

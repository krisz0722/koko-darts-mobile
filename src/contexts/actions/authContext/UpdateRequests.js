import fetchPost from "../../../utils/fetchPost";

const updateRequests = async (state, checkedProfiles) => {
  const { username, id, img, friendRequestSent } = state;

  await fetchPost("api/updatefriendrequestsent", {
    uid: id,
    newRequests: checkedProfiles,
  });

  await fetchPost("api/updatefriendrequestreceived", {
    checkedProfiles,
    username,
    img,
    id,
  });
  const newfriendRequestSent = checkedProfiles.concat(friendRequestSent);
  return {
    ...state,
    friendRequestSent: newfriendRequestSent,
  };
};

export default updateRequests;

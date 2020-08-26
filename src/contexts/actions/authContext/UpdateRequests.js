import {
  updatefriendRequestReceived,
  updatefriendRequestSent,
} from "../../../_backend/db/crudUpdate";

const updateRequests = (state, checkedProfiles) => {
  const { username, img, friendRequestSent } = state;

  updatefriendRequestSent(username, checkedProfiles);

  checkedProfiles.forEach((usernameRequested) => {
    updatefriendRequestReceived(usernameRequested, username, img);
  });
  const newfriendRequestSent = checkedProfiles.concat(friendRequestSent);
  return {
    ...state,
    friendRequestSent: newfriendRequestSent,
  };
};

export default updateRequests;

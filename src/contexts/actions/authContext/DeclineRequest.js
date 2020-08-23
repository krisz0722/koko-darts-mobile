import { declineFriendRequest } from "../../../fb/crud";

const declineAuthRequest = (state, sender) => {
  const { username, friendRequestReceived } = state;

  const index = friendRequestReceived.indexOf(sender);
  friendRequestReceived.splice(index, 1);

  declineFriendRequest(username, friendRequestReceived, sender.username);
};

export default declineAuthRequest;

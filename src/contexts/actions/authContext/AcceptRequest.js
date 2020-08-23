import { acceptFriendRequest } from "../../../fb/crud";

const acceptAuthRequest = (state, sender) => {
  const { username, friendRequestReceived } = state;

  const index = friendRequestReceived.indexOf(sender);
  friendRequestReceived.splice(index, 1);

  acceptFriendRequest(username, friendRequestReceived, sender.username);
};

export default acceptAuthRequest;

import styled from "styled-components/native";
import { Animated } from "react-native";

const PlayerInfoAvatar = styled(Animated.Image)`
  height: 100%;
  position: absolute;
  top: 0;
`;

export const Avatar1 = styled(PlayerInfoAvatar)`
  left: 0;
  border-right-width: ${({ theme }) => theme.borderWidth};
`;

export const Avatar2 = styled(PlayerInfoAvatar)`
  right: 0;
  border-left-width: ${({ theme }) => theme.borderWidth};
`;

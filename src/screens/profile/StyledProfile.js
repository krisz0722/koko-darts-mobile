import { TouchableOpacity, View, Image } from "react-native";
import styled from "styled-components";
import {
  Border,
  FlexCol,
  FlexColAround,
  FlexRow,
  FlexRowBetween,
  Window,
} from "../../styles/css_mixins";
import { Header4, P3_Bold } from "../../components/headers/StyledHeaders";

export const Header = styled(View)`
  ${FlexRow};
  height: 30%;
  width: 100%;
`;

export const Container = styled(View)`
  ${FlexCol};
  width: 40%;
  height: 100%;
`;

export const Container2 = styled(Container)`
  ${FlexColAround};
  width: 60%;
  padding: 5% 0;
  border-color: ${({ theme }) => theme.borderColor};
`;

export const SubContainer = styled(Image)`
  width: 60%;
  height: ${() => Window.width * 0.4 * 0.6};
  border-radius: 4px;
  ${Border(({ theme }) => theme.borderColor)};
  margin-bottom: 10%;
`;

export const Name = styled(View)`
  width: 80%;
  ${FlexColAround};
`;

export const NameText = styled(Header4)`
  color: ${({ theme }) => theme.text};
  margin-bottom: 10%;
`;

export const EditButton = styled(TouchableOpacity)`
  padding: 3%;
  background-color: ${({ theme }) => theme.text};
  border-radius: 4px;
`;

export const Field = styled(View)`
  ${FlexRowBetween};
  width: 90%;
  padding-right: 5%;
  padding-left: 5%;
  height: 15%;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.text};

  border-radius: 4px;
`;

export const Stat = styled(P3_Bold)`
  text-align: left;
  width: 70%;
  color: ${({ theme }) => theme.text2};
`;

export const StatValue = styled(Stat)`
  text-align: right;
  width: 30%;
`;

export const NavigationWindow = styled(View)`
  height: 62%;
  width: 100%;
`;

export const AddButton = styled(View)`
  ${FlexCol};
`;

import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import styled from "styled-components/native";
import { FlexCol } from "../../styles/css_mixins";
import { Header1 } from "../../components/headers/StyledHeaders";

const Title = styled(Header1)`
  width: 100%;
  height: 100%;
  padding: 2%;
  ${FlexCol};
`;

const TIMELINE = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Title theme={theme}>
      {`this feature is not available yet. \n stay tuned`}.
    </Title>
  );
};

export default TIMELINE;

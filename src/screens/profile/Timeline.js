import React, { useContext } from "react";
import { HeaderText } from "../home/StyledHome";
import { ThemeContext } from "../../contexts/ThemeContext";
import styled from "styled-components";
import { FlexCol } from "../../styles/css_mixins";

const Title = styled(HeaderText)`
  width: 100%;
  height: 100%;
  padding: 2%;
  ${FlexCol}
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

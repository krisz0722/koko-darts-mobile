import React, { useContext } from "react";
import { Text, View } from "react-native";
import { GameContext } from "../../../contexts/GameContext";
import { CHECKOUTS } from "../../../calc/scores";

import styled from "styled-components";
import { FlexRowAround, AlignText } from "../../../styles/css_mixins";

const Checkout_Row = styled(View)`
  width: 100%;
  height: 100%;
  ${FlexRowAround};
`;

const Checkout_Text = styled(Text)`
  ${AlignText};
  color: ${({ theme }) => theme.text};
  font-size: 15;
  font-family: ${({ theme }) => theme.fontFamily};
  width: ${() => 100 / 3 + "%"};
`;

const PLAYER_CHECKOUTS = ({ player }) => {
  const { gameData } = useContext(GameContext);

  const { score, onCheckout } = gameData[`${player}_DATA`];

  const checkouts = onCheckout
    ? CHECKOUTS.find((co) => co.value === score).checkouts
    : null;

  return (
    <>
      {checkouts
        ? checkouts.map((co) => {
            const r1 = co.rounder1.name;
            const r2 = co.rounder2.name;
            const d = co.double.name;

            return (
              <Checkout_Row key={checkouts.indexOf(co)} isCheckout={onCheckout}>
                {r1 !== "0" ? <Checkout_Text>{r1}</Checkout_Text> : null}
                {r2 !== "0" ? <Checkout_Text>{r2}</Checkout_Text> : null}
                {d !== "0" ? <Checkout_Text>{d}</Checkout_Text> : null}
              </Checkout_Row>
            );
          })
        : null}
    </>
  );
};

export default PLAYER_CHECKOUTS;
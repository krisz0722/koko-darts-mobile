import React from "react";
import { CHECKOUTS } from "../../../calc/scores";
import { Checkout_Row, Checkout_Text } from "./StyledClassicCheckoutsDiv";

const PLAYER_CHECKOUTS = React.memo(({ playerData, theme }) => {
  const { score, onCheckout } = playerData;

  const checkoutSeq = CHECKOUTS.find((co) => co.value === score);
  const checkouts = onCheckout && checkoutSeq ? checkoutSeq.checkouts : null;

  return (
    <>
      {checkouts
        ? checkouts.map((co) => {
            const r1 = co.rounder1.name;
            const r2 = co.rounder2.name;
            const d = co.double.name;

            return (
              <Checkout_Row key={checkouts.indexOf(co)} isCheckout={onCheckout}>
                {r1 !== "0" ? (
                  <Checkout_Text theme={theme}>{r1}</Checkout_Text>
                ) : null}
                {r2 !== "0" ? (
                  <Checkout_Text theme={theme}>{r2}</Checkout_Text>
                ) : null}
                {d !== "0" ? (
                  <Checkout_Text theme={theme}>{d}</Checkout_Text>
                ) : null}
              </Checkout_Row>
            );
          })
        : null}
    </>
  );
});

export default PLAYER_CHECKOUTS;

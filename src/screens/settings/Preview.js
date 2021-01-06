import React from "react";
import GAME_WINDOW from "../gamewindow/Classic";
import { PreviewContainer } from "./home/StyledSettings";

export const PREVIEW = React.memo((props) => {
  const { theme, preview, ingame, settings } = props;

  const { opacity } = settings;

  return (
    <PreviewContainer ingame={ingame} visible={preview} theme={theme}>
      <GAME_WINDOW
        opacitySettings={opacity}
        ingame={ingame}
        preview={true}
        settings={settings}
        visible={preview}
      />
    </PreviewContainer>
  );
});
export default PREVIEW;

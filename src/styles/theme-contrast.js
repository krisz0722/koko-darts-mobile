export const Base = {
  height: 748.8571428571429,
  width: 411.42857142857144,
};
import { RFValue } from "react-native-responsive-fontsize";

const Theme_Contrast = {
  name: "contrast",
  fontFamily: "SairaExtraCondensed-Regular",
  fontFamilyBold: "SairaExtraCondensed-Bold",
  bgOverlay: "rgba(0,15,10,0.9)",
  bgOverlay2: "rgba(0,0,0, 0.8)",
  bgActive: "rgb(255, 255, 255)",
  bgRed: "rgb(235, 87, 87)",
  bgGreen: "rgb(33, 150, 83)",
  bg1: "rgb(51, 51, 51)",
  bg2: "rgb(255,255,255)",
  bg3: "rgb(235, 87, 87)",
  text: "rgb(255, 255, 255)",
  text2: "rgb(0, 0, 0)",
  borderColor: "rgb(235, 87, 87)",
  borderWidth: RFValue(1, Base.height),

  fonts: {
    icon1: RFValue(25, Base.height),
    icon2: RFValue(25, Base.height),
    icon3: RFValue(15, Base.height),
    iconBig: RFValue(35, Base.height),
    iconLarge: RFValue(75, Base.height),
    header1: RFValue(30, Base.height),
    header2: RFValue(25, Base.height),
    header3: RFValue(20, Base.height),
    header4: RFValue(15, Base.height),
    p1: RFValue(17.5, Base.height),
    p2: RFValue(14.5, Base.height),
    p3: RFValue(12.5, Base.height),
    p4: RFValue(10, Base.height),
    fontSizeFunction: RFValue(15, Base.height),
    fontSizeNum: RFValue(45, Base.height),
    textInput: RFValue(20, Base.height),

    score: {
      classic: {
        fs1: RFValue(80, Base.height),
        fs2: RFValue(60, Base.height),
        fs3: RFValue(50, Base.height),
      },
    },
    stats: {
      scoreSub: RFValue(20, Base.height),
    },
    name: {
      classic: RFValue(20, Base.height),
      classic2: RFValue(15, Base.height),
      asym: RFValue(20, Base.height),
    },

    legset: {
      classic: {
        fs1: RFValue(25, Base.height),
        fs2: RFValue(20, Base.height),
      },
    },
  },

  buttonType: {
    basic: {
      bg: "transparent",
      color: "rgb(255,255,255)",
    },
    active: {
      bg: "rgb(255, 255, 255)",
      color: "rgb(0, 0, 0)",
    },
    active2: {
      bg: "rgb(235, 87, 87)",
      color: "rgb(255, 255, 255)",
    },
    ghost: {
      bg: "transparent",
      color: "rgb(235, 87, 87)",
    },
    success: {
      bg: "rgb(33, 150, 83)",
      color: "rgb(255,255,255)",
    },
    danger: {
      bg: "rgb(235, 87, 87)",
      color: "rgb(255,255,255)",
    },
  },

  buttonSize: {
    small: 0.075,
    medium: 0.1,
    large: 0.2,
  },

  game: {
    bgOnCheckout: "rgb(33, 150, 83)",
    p1Bg: "rgb(51, 51, 51)",
    p2Bg: "rgb(242, 242, 242)",
    p1Overlay: "rgba(51,51,51,0.8)",
    p2Overlay: "rgba(242, 242, 242, 0.8)",
    p1Text: "rgb(242, 242, 242)",
    p2Text: "rgb(0, 0, 0)",
    p1Border: "rgb(255,255,255)",
    p2Border: "rgb(0,0,0)",

    middle: {
      bgMid: "rgb(235, 87, 87)",
    },
  },
};

export default Theme_Contrast;

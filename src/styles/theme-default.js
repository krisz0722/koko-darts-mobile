export const Base = {
  height: 748.8571428571429,
  width: 411.42857142857144,
};
import { RFValue } from "react-native-responsive-fontsize";

const Theme_Default = {
  name: "default",
  fontFamily: "Montserrat-Regular",
  fontFamilyBold: "Montserrat-Bold",
  bgOverlay: "rgba(8, 89, 89, 0.9)",
  bgOverlay2: "rgba(8, 89, 89, 0.9)",
  bgActive: "rgb(255,255,255)",
  bgRed: "rgb(235, 87, 87)",
  bgGreen: "rgb(33, 150, 83)",
  bg1: "rgb(2, 40, 36)",
  bg2: "rgb(255,255,255)",
  bg3: "rgb(8, 89, 89)",
  text: "rgb(255, 255, 255)",
  text2: "rgb(8, 89, 89)",
  borderColor: "rgba(255,255,255,0.5)",
  borderWidth: RFValue(1, Base.height),

  fonts: {
    icon1: RFValue(25, Base.height),
    icon2: RFValue(25, Base.height),
    icon3: RFValue(15, Base.height),
    iconBig: RFValue(35, Base.height),
    iconLarge: RFValue(75, Base.height),
    header1: RFValue(20, Base.height),
    header2: RFValue(17.5, Base.height),
    header3: RFValue(15, Base.height),
    header4: RFValue(10, Base.height),
    p1: RFValue(13, Base.height),
    p2: RFValue(10, Base.height),
    p3: RFValue(8, Base.height),
    p4: RFValue(7, Base.height),
    fontSizeFunction: RFValue(12, Base.height),
    fontSizeNum: RFValue(35, Base.height),
    textInput: RFValue(15, Base.height),

    score: {
      classic: {
        fs1: RFValue(80, Base.height),
        fs2: RFValue(60, Base.height),
        fs3: RFValue(50, Base.height),
      },
    },

    stats: {
      scoreSub: RFValue(15, Base.height),
    },

    name: {
      classic: RFValue(18, Base.height),
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
      bg: "rgb(8, 89, 89)",
      color: "rgb(255, 255, 255)",
    },
    ghost: {
      bg: "transparent",
      color: "rgba(255,255,255,0.5)",
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
    p1Bg: "rgb(242, 242, 242)",
    p2Bg: "rgb(2, 40, 36)",
    p1Overlay: "rgba(255,255,255,0.8)",
    p2Overlay: "rgba(2, 40, 36, 0.8)",
    p1Text: "rgb(8, 89, 89)",
    p2Text: "rgb(255, 255, 255)",
    p1Border: "rgb(8, 89, 89)",
    p2Border: "rgb(255,255,255)",

    middle: {
      bgMid: "rgb(137, 160, 159)",
    },
  },
};

export default Theme_Default;

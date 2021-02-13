import React from "react";
import IconDart from "./iconDart";

const IconThreeDart = ({ fill, size }) => (
  <>
    <IconDart fill={fill} size={size} />
    <IconDart fill={fill} size={size} />
    <IconDart fill={fill} size={size} />
  </>
);

export default IconThreeDart;

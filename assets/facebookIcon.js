import React from "react";
import Svg, { Path } from "react-native-svg";

const FacebookIcon = () => {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 512 512"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill="white"
        d="M443.004 0H68.995C30.8919 0 0.00195312 30.8887 0.00195312 68.993V443.004C0.00195312 481.109 30.8907 511.998 68.995 511.998H253.454L253.769 329.037H206.236C200.059 329.037 195.045 324.042 195.021 317.865L194.793 258.889C194.769 252.678 199.798 247.631 206.009 247.631H253.456V190.645C253.456 124.514 293.844 88.5055 352.838 88.5055H401.246C407.44 88.5055 412.462 93.5267 412.462 99.7214V149.45C412.462 155.642 407.443 160.662 401.252 160.666L371.545 160.68C339.462 160.68 333.25 175.925 333.25 198.298V247.632H403.746C410.463 247.632 415.675 253.498 414.883 260.168L407.893 319.144C407.224 324.788 402.439 329.04 396.756 329.04H333.564L333.25 512H443.006C481.11 512 511.998 481.111 511.998 443.008V68.993C511.997 30.8887 481.108 0 443.004 0Z"
      />
    </Svg>
  );
};

export default FacebookIcon;
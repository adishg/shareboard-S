import oc from "open-color";
import React from "react";

// https://github.com/tholman/github-corners
export const GitHubCorner = React.memo(
  ({ appearance }: { appearance: "light" | "dark" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 250 250"
      className="github-corner rtl-mirror"
    >
    </svg>
  ),
);

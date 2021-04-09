import "./ToolIcon.scss";

import React,{BaseSyntheticEvent} from "react";
import clsx from "clsx";
import { alignElements } from "../align";

type UploadIconSize = "s" | "m";

type UploadIconProps = {
  title?: string;
  name?: string;
  id?: string;
  onClick?(e:BaseSyntheticEvent): void;
  size?: UploadIconSize;
  zenModeEnabled?: boolean;
};

const DEFAULT_SIZE: UploadIconSize = "m";

const ICONS = {
  DEFAULT: (

    <svg style={{marginLeft: "10px"}} height="30" width="200">
      <text x="0" y="15" fill="black" > +</text>
    </svg>

  )
};

export const UploadIcon = (props: UploadIconProps) => {
  return (
    <label
      className={clsx(
        "ToolIcon ToolIcon__lock ToolIcon_type_floating zen-mode-visibility",
        `ToolIcon_size_${props.size || DEFAULT_SIZE}`,
        {
          "zen-mode-visibility--hidden": props.zenModeEnabled,
        },
      )}
      title={`${props.title} — Q`}
    >
      <input
        className="ToolIcon_type_checkbox"
        type="file"
        name={props.name}
        id={props.id}
        onChange={props.onClick}
        aria-label={props.title}
      />
    
      <div className="ToolIcon__icon">
        {ICONS.DEFAULT}
      </div>
    </label>
  );
};

import React from "react";
import { KEYS } from "./keys";

// We inline font-awesome icons in order to save on js size rather than including the font awesome react library
export const SHAPES = [
  {
    icon: (
      // fa-mouse-pointer
      <svg viewBox="0 0 320 512" className="">
        <path d="M302.189 329.126H196.105l55.831 135.993c3.889 9.428-.555 19.999-9.444 23.999l-49.165 21.427c-9.165 4-19.443-.571-23.332-9.714l-53.053-129.136-86.664 89.138C18.729 472.71 0 463.554 0 447.977V18.299C0 1.899 19.921-6.096 30.277 5.443l284.412 292.542c11.472 11.179 3.007 31.141-12.5 31.141z" />
      </svg>
    ),
    value: "selection",
    key: [KEYS.V, KEYS.S],
  },
  {
    icon: (
      // fa-square
      <svg viewBox="0 0 448 512">
        <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z" />
      </svg>
    ),
    value: "rectangle",
    key: KEYS.R,
  },
  {
    icon: (
      // custom
      <svg viewBox="0 0 223.646 223.646">
        <path d="M111.823 0L16.622 111.823 111.823 223.646 207.025 111.823z" />
      </svg>
    ),
    value: "diamond",
    key: KEYS.D,
  },
  {
    icon: (
      // custom
      <svg viewBox="0 0 512 512">
        
        <path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z" />
      </svg>
    ),
    value: "star",
    key: KEYS.I,
  },
  {
    icon: (
      // fa-circle
      <svg viewBox="0 0 512 512">
        <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z" />
      </svg>
    ),
    value: "ellipse",
    key: KEYS.E,
  },
  {
    icon: (
      // fa-semicircle
      <svg viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M8 256c0 136.966 111.033 248 248 248s248-111.034 248-248S392.966 8 256 8 8 119.033 8 256zm248 184V72c101.705 0 184 82.311 184 184 0 101.705-82.311 184-184 184z"
        />
      </svg>
    ),
    value: "semicircle",
    key: KEYS.F,
  },
  {
    icon: (
      // fa-long-arrow-alt-right
      <svg viewBox="0 0 448 512" className="rtl-mirror">
        <path d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z" />
      </svg>
    ),
    value: "arrow",
    key: KEYS.A,
  },
  {
    icon: (
      // custom
      <svg viewBox="0 0 6 6">
        <line
          x1="0"
          y1="3"
          x2="6"
          y2="3"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
    ),
    value: "line",
    key: [KEYS.P, KEYS.L],
  },
  {
    icon: (
      // fa-pencil
      <svg viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
        ></path>
      </svg>
    ),
    value: "draw",
    key: KEYS.X,
  },
  {
    icon: (
      // fa-font
      <svg viewBox="0 0 448 512">
        <path d="M432 416h-23.41L277.88 53.69A32 32 0 0 0 247.58 32h-47.16a32 32 0 0 0-30.3 21.69L39.41 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-19.58l23.3-64h152.56l23.3 64H304a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM176.85 272L224 142.51 271.15 272z" />
      </svg>
    ),
    value: "text",
    key: KEYS.T,
  },
] as const;

export const findShapeByKey = (key: string) => {
  const shape = SHAPES.find((shape, index) => {
    return (
      key === (index + 1).toString() ||
      (typeof shape.key === "string"
        ? shape.key === key
        : (shape.key as readonly string[]).includes(key))
    );
  });
  return shape?.value || null;
};

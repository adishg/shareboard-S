import { Point } from "../types";
import { FONT_FAMILY } from "../constants";

export type ChartType = "bar" | "line";
export type FillStyle = "hachure" | "cross-hatch" | "solid";
export type FontFamily = keyof typeof FONT_FAMILY;
export type FontString = string & { _brand: "fontString" };
export type GroupId = string;
export type PointerType = "mouse" | "pen" | "touch";
export type StrokeSharpness = "round" | "sharp";
export type StrokeStyle = "solid" | "dashed" | "dotted";
export type TextAlign = "left" | "center" | "right";
export type VerticalAlign = "top" | "middle";

type _ExcalidrawElementBase = {
  id: string;
  x: number;
  y: number;
  strokeColor: string;
  backgroundColor: string;
  fillStyle: FillStyle;
  strokeWidth: number;
  strokeStyle: StrokeStyle;
  strokeSharpness: StrokeSharpness;
  roughness: number;
  opacity: number;
  width: number;
  height: number;
  angle: number;
  /** Random integer used to seed shape generation so that the roughjs shape
      doesn't differ across renders. */
  seed: number;
  /** Integer that is sequentially incremented on each change. Used to reconcile
      elements during collaboration or when saving to server. */
  version: number;
  /** Random integer that is regenerated on each change.
      Used for deterministic reconciliation of updates during collaboration,
      in case the versions (see above) are identical. */
  versionNonce: number;
  isDeleted: boolean;
  /** List of groups the element belongs to.
      Ordered from deepest to shallowest. */
  groupIds: readonly GroupId[];
  /** Ids of (linear) elements that are bound to this element. */
  boundElementIds: readonly ExcalidrawLinearElement["id"][] | null;
};

export type ExcalidrawSelectionElement = _ExcalidrawElementBase & {
  type: "selection";
};

export type ExcalidrawRectangleElement = _ExcalidrawElementBase & {
  type: "rectangle";
};

export type ExcalidrawDiamondElement = _ExcalidrawElementBase & {
  type: "diamond";
};

export type ExcalidrawStarElement = _ExcalidrawElementBase & {
  type: "star";
};


export type ExcalidrawEllipseElement = _ExcalidrawElementBase & {
  type: "ellipse";
};

export type ExcalidrawSemiCircleElement = _ExcalidrawElementBase & {
  type: "semicircle";
};

/**
 * These are elements that don't have any additional properties.
 */
export type ExcalidrawGenericElement =
  | ExcalidrawSelectionElement
  | ExcalidrawRectangleElement
  | ExcalidrawStarElement
  | ExcalidrawDiamondElement
  | ExcalidrawEllipseElement
  | ExcalidrawSemiCircleElement;

/**
 * ExcalidrawElement should be JSON serializable and (eventually) contain
 * no computed data. The list of all ExcalidrawElements should be shareable
 * between peers and contain no state local to the peer.
 */
export type ExcalidrawElement =
  | ExcalidrawGenericElement
  | ExcalidrawTextElement
  | ExcalidrawLinearElement;

export type NonDeleted<TElement extends ExcalidrawElement> = TElement & {
  isDeleted: false;
};

export type NonDeletedExcalidrawElement = NonDeleted<ExcalidrawElement>;

export type ExcalidrawTextElement = _ExcalidrawElementBase &
  {
    type: "text";
    file:string;
    fontSize: number;
    fontFamily: FontFamily;
    text: string;
    baseline: number;
    textAlign: TextAlign;
    verticalAlign: VerticalAlign;
  };

export type ExcalidrawBindableElement =
  | ExcalidrawRectangleElement
  | ExcalidrawStarElement
  | ExcalidrawDiamondElement
  | ExcalidrawEllipseElement
  | ExcalidrawSemiCircleElement
  | ExcalidrawTextElement;

export type PointBinding = {
  elementId: ExcalidrawBindableElement["id"];
  focus: number;
  gap: number;
};

export type Arrowhead = "arrow" | "bar" | "dot";

export type ExcalidrawLinearElement = _ExcalidrawElementBase &
  Readonly<{
    type: "line" | "draw" | "arrow";
    points: readonly Point[];
    lastCommittedPoint: Point | null;
    startBinding: PointBinding | null;
    endBinding: PointBinding | null;
    startArrowhead: Arrowhead | null;
    endArrowhead: Arrowhead | null;
  }>;

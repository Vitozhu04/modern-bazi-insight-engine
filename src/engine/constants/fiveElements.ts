export const elements = ["木", "火", "土", "金", "水"] as const;

export type Element = (typeof elements)[number];

export const generatingCycle: Element[] = ["木", "火", "土", "金", "水"];

export const controllingCycle: Element[] = ["木", "土", "水", "火", "金"];

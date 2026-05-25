export type Platform = "WEB" | "DESKTOP";
export type Target = "WIN" | "MAC" | "LIN";

const platform = (process.env.NEXT_PUBLIC_PLATFORM || "WEB") as Platform;
const target = (process.env.NEXT_PUBLIC_TARGET || "MAC") as Target;

export const ENV = {
  platform,
  target
};

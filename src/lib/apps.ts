import { TApp } from "@/types/apps.type";

export const getAllLibrary = async (): Promise<TApp[]> => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await res.json();
  return data;
};
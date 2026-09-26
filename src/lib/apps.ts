

// import { TApp } from "@/types/apps.type";

// export const getAllLibrary = async (): Promise<TApp[]> => {
//   const res = await fetch(process.env.NEXT_PUBLIC_API_URL!);
//   const data = await res.json();
//   return data;
// };

// import { TApp } from "@/types/apps.type";

// export const getAllLibrary = async (): Promise<TApp[]> => {
//   console.log("=== ENV DEBUG ===", process.env.NEXT_PUBLIC_API_URL);

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   if (!apiUrl) {
//     throw new Error("NEXT_PUBLIC_API_URL is not defined. Check .env.local.");
//   }

//   const res = await fetch(apiUrl);
//   const data = await res.json();
//   return data;
// };

import { TApp } from "@/types/apps.type";

export const getAllLibrary = async (): Promise<TApp[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.abcz.workers.dev/api/fitlog";

  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
};
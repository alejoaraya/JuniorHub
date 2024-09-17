import { User } from "../@types/types";

export const getInfoUser = async (token = ""): Promise<User> => {
  const res = await fetch("https://juniorhub.somee.com/api/employer/current", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();
  // console.log(payload);

  return payload;
};

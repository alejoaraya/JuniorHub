import { Offer } from "../@types/types";
import { verifyToken } from "./verifyToken";

export const loadOffers = async (query = ""): Promise<Offer[]> => {
  // const technologies: Technology[] = [];
  const token = verifyToken();
  const res = await fetch(
    `https://juniorhub.somee.com/api/offers?search=${query}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log("res", res);
  const data = await res.json();
  // console.log("data", data.offers);

  return data.offers;
};

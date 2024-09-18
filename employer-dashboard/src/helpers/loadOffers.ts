import { verifyToken } from "./verifyToken";

export const loadOffers = async (/* uid: string */) => {
  try {
    const token = verifyToken();
    // if (!token) throw new Error();

    const res = await fetch(
      "https://juniorhub.somee.com/api/employer/current",
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

    return data.offers || [];
  } catch (error) {
    console.log(error);
  }
};

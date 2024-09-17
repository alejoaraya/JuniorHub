import { Offer } from "../@types/types";
import { verifyToken } from "./verifyToken";

export const loadOffers = async (query = ""): Promise<Offer[]> => {
  const search = `?search=${query}`;
  // const technologies: Technology[] = [];
  const token = verifyToken();
  const res = await fetch(
    `https://juniorhub.somee.com/api/offers${search && search}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log("res", res);
  const data = await res.json();
  console.log("data", data.offers);

  return data.offers;

  // if (!uid) throw new Error("UID is undefined");
  // const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  // const docs = await getDocs(collectionRef);

  // const notes: Offer[] = [];
  // docs.forEach((doc) => {
  //   notes.push({
  //     id: doc.id,
  //     ...(doc.data() as Offer),
  //   });
  // });
};

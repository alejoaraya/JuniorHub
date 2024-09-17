import { Technology } from "../@types/types";
import { verifyToken } from "./verifyToken";

export const loadTechnologies = async (/* uid: string */): Promise<
  Technology[]
> => {
  // const technologies: Technology[] = [];
  const userToken = verifyToken();
  const res = await fetch("https://juniorhub.somee.com/api/technologies", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  // console.log("res", res);
  const { data } = await res.json();
  // console.log("data", data);

  return data;

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

import { decodeJwt, JWTPayload } from "jose";
import { Link, Technology } from "../@types/types";

interface JWTPayloadExtend extends JWTPayload {
  email: string;
  name: string;
  lastName: string;
  description: string;
  links: Link[];
  mediaUrl: string;
  technologies: Technology[];
}

export const verifyToken = async (
  token: string
): Promise<JWTPayloadExtend | null> => {
  try {
    const user: JWTPayloadExtend = decodeJwt(token);

    return user;
  } catch (error) {
    console.error("Token inválido o expirado: " + error);
    return null;
  }
};

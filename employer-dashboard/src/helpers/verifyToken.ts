import { decodeJwt, JWTPayload } from "jose";

interface JWTPayloadExtend extends JWTPayload {
  email: string;
  name: string;
  lastName: string;
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

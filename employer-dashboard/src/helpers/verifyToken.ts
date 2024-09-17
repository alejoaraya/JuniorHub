export const verifyToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (token == null) throw new Error();
    // console.log(token);

    return token;
  } catch (error) {
    console.error("Token inválido o expirado: " + error);
    return null;
  }
};

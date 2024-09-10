import { Navigate, Route, Routes } from "react-router-dom";
import { useCheckAuth } from "../../hooks";
import { Loading } from "../../ui";
import { ApplicationRoute } from "../application/route/ApplicationRoute";
import { AuthRoute } from "../auth/routes/AuthRoute";

export const RouterApp = () => {
  const status = useCheckAuth();

  if (status === "checking") {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        {status === "not-authenticated" ? (
          <Route path='/auth/*' element={<AuthRoute />} />
        ) : (
          <Route path='/*' element={<ApplicationRoute />} />
        )}
        <Route path='/*' element={<Navigate to={"/auth/login"} />} />
      </Routes>
    </>
  );
};

import { Navigate, Route, Routes } from "react-router-dom";
import { ApplicationPage } from "../application/ApplicationPage";
import { Navbar } from "../application/components/Navbar";
import { EditProfile } from "../profile/page/EditProfile";
import { Profile } from "../profile/page/Profile";
import { useCheckAuth } from "../../hooks";
import { Loading } from "../../ui";
import { AuthRoute } from "../auth/routes/AuthRoute";
import { ApplicationRoute } from "../application/route/ApplicationRoute";

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

import { Route, Routes } from "react-router-dom";
import { ApplicationPage } from "../application/ApplicationPage";
import { Navbar } from "../application/components/Navbar";
import { EditProfile } from "../profile/page/EditProfile";
import { Profile } from "../profile/page/Profile";

export const RouterApp = () => {
  // const status = useCheckAuth();

  // if (status === "checking") {
  //   return <Loading />;
  // }

  return (
    <>
      <Navbar />
      <Routes>
        {/* {status === "not-authenticated" ? (
          <Route path='/auth/*' element={<AuthRoute />} />
        ) : (
          // <Route path='/*' element={<JournalRoutes />} />
          )} */}
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/edit' element={<EditProfile />} />
        <Route path='/*' element={<ApplicationPage />} />
      </Routes>
    </>
  );
};

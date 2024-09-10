import { Navigate, Route, Routes } from "react-router";
import { EditProfile } from "../../profile/page/EditProfile";
import { Profile } from "../../profile/page/Profile";
import { ApplicationPage } from "../ApplicationPage";
import { Navbar } from "../components/Navbar";

export const ApplicationRoute = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ApplicationPage />} />
        <Route path='profile'>
          <Route index element={<Profile />} />
          <Route path='edit' element={<EditProfile />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
};

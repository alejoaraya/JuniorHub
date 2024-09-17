import { Navigate, Route, Routes } from "react-router";
import { JournalPage } from "../pages/JournalPage";
import { EditProfilePage } from "../pages/EditProfilePage";

export const JournalRoutes = () => {
  return (
    <Routes>
      <Route path='/edit' element={<EditProfilePage />} />
      <Route path='/' element={<JournalPage />} />
      <Route path='/*' element={<Navigate to={"/"} />} />
    </Routes>
  );
};

import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import ProjectPage from "./pages/ProjectPage";
import StudentPage from "./pages/StudentPage";
import SavedPage from "./pages/SavedPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="projects" element={<ExplorePage />} />
        <Route path="projects/:projectId" element={<ProjectPage />} />
        <Route path="students/:studentId" element={<StudentPage />} />
        <Route path="saved" element={<SavedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
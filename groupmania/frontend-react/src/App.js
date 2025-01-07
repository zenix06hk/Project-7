import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

//Layout

import AuthLayout from "./layout/UserAuth/AuthLayout";
import HomeLayout from "./layout/MainLayout/HomeLayout";

//Pages

import Login from "./pages/Login";
import Register from "./pages/Register";

import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";
import PostContent from "./pages/PostContent";
import FriendsList from "./pages/FriendsList";
import UserSaved from "./pages/UserSaved";
import Events from "./pages/Events";
import Settings from "./pages/Settings";
import UserUpdateInfo from "./pages/UserUpdateInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="home" element={<PostContent />} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Sidebar />
              </>
            }
          />

          <Route path="friendslist" element={<FriendsList />} />
          <Route path="usersaved" element={<UserSaved />} />
          <Route path="Events" element={<Events />} />
          <Route path="settings" element={<Settings />} />
          <Route path="userupdateinfo" element={<UserUpdateInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import {
  Home,
  Messages,
  Explore,
  LikedPosts,
  Search,
  Profile,
  UserProfile,
  UserAvatar,
} from "./root/pages";
import AuthLayout from "./auth/AuthLayout";
import Signup from "./auth/forms/Signup";
import Login from "./auth/forms/Login";
import RootLayout from "./root/RootLayout";
import { loader as userProfileLoader } from "./root/pages/UserProfile";
import { loader as authLoader } from "./ProtectRoute";
import ProtectRoute from "./ProtectRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* public Route */}
      <Route element={<AuthLayout />}>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userAvatar" element={<UserAvatar />} />
      </Route>

      {/* protected Route */}
      <Route
        path="/"
        element={
          <ProtectRoute>
            <RootLayout />
          </ProtectRoute>
        }
        loader={authLoader}
      >
        <Route index element={<Home />} />
        <Route path="messages" element={<Messages />} />
        <Route path="explore" element={<Explore />} />
        <Route path="liked-posts" element={<LikedPosts />} />
        <Route path="search" element={<Search />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="profile/:userId"
          element={<UserProfile />}
          loader={userProfileLoader}
        />
      </Route>
    </Route>
  )
);

function Routers() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
  {
    /* <App/> */
  }
}

export default Routers;

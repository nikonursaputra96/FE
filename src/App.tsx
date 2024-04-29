import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import LoginForm from "./component/loginForm";
import Register from "./component/registerForm/Register";
import { useAppDispatch } from "./store";
import { getProfile } from "./lib/api/call/profile";
import { SET_LOGIN } from "./store/slice/auth";
import { useEffect } from "react";
import DetailThread from "./pages/DetailThread";
import Follow from "./pages/Follow/component/follow";
import FollowButton from "./pages/Follow/pagesFollow";
import Person from "./pages/ProfilePerson/person";

const App = () => {
  const dispatch = useAppDispatch();

  const checkToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await getProfile(token);
      dispatch(SET_LOGIN({ user: res.data.data, token }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const IsLogin = () => {
    if (!localStorage.getItem("token")) {
      return <Navigate to={"/login"} />;
    } else {
      return <Outlet />;
    }
  };

  const IsNotLogin = () => {
    if (localStorage.getItem("token")) {
      return <Navigate to={"/"} />;
    } else {
      return <Outlet />;
    }
  };
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IsLogin />}>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/follow" element={<FollowButton />} />
              <Route path="detail/:threadId" element={<DetailThread/>}/>
              <Route path="/profile-id/:userId" element={<Person />} />
            </Route>
          </Route>

          <Route path="/" element={<IsNotLogin />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

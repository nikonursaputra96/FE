import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import SideBarProfile from "../component/profileSidebar/SR_Profile";
import SideBarSuggested from "../component/profileSidebar/SR_Suggested";
import SideBarFooter from "../component/profileSidebar/SR_Footer";

const RootLayout = () => {
  const location = useLocation()
  return (
    <Box display={"fixed"}  bgColor={"#1d1d1d"} h={"100vh"}  color={"white"} >
      <Box w={"25%"}>
        <Sidebar />
      </Box>
      <Box
        overflowY={"auto"}
        borderRight={"3px solid rgba(60, 60, 60, 1)"}
        borderLeft={"3px solid rgba(60, 60, 60, 1)"}
        justifyContent={"center"}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        w={"45%"}
      >
        <Outlet />
      </Box>
      <Box  w={"30%"} px={5} overflowY={"auto"}>
        {location.pathname !== "/profile" && <SideBarProfile />}
        <SideBarSuggested />
        <SideBarFooter />
      </Box>
    </Box>
  );
};

export default RootLayout;

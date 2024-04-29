import { Box, Divider } from "@chakra-ui/react"
import ProfileHeader from "./component/ProfileHeader"
import { useState } from "react"
import ProfileCards from "./component/ProfileCard"
import ProfileMedia from "./component/ProfileMedia"

const Profile = () => {
  const [menuActive, setActiveMenu] = useState('AllPost')
    const handleMenuClick = (menu:string) => {
        setActiveMenu(menu)
    }
    
  return (
    <Box>
      <ProfileHeader handleMenuClick={handleMenuClick} 
      menuActive ={menuActive}/>
       {menuActive === "AllPost" ? <ProfileCards /> : <ProfileMedia />}
      <Divider borderColor="rgba(144, 144, 144, 1)" mt="20px" />
    
    </Box>
  )
}

export default Profile
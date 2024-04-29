
import { Box, Divider } from "@chakra-ui/react"
import { useState } from "react"
import ProfileHeaderPerson from "./component/ProfileHeader"
import ProfileMediaPerson from "./component/ProfileMedia"
import ProfileCardsPerson from "./component/ProfileCard"



const Person = () => {
    const [menuActive, setActiveMenu] = useState('AllPost')
    const handleMenuClick = (menu:string) => {
        setActiveMenu(menu)
    }
    
  return (
    <Box>
      <ProfileHeaderPerson handleMenuClick={handleMenuClick} 
      menuActive ={menuActive}/>
       {menuActive === "AllPost" ? <ProfileCardsPerson showLike={true} /> : <ProfileMediaPerson />}
      <Divider borderColor="rgba(144, 144, 144, 1)" mt="20px" />
    
    </Box>
  )
}

export default Person
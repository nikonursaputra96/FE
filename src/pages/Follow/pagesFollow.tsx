import { Box, Divider } from '@chakra-ui/react'
import Follows from './component/follow'
import { useState } from 'react'
import Followers from './component/followers'
import Following from './component/following'


const FollowButton = () => {
  const [menuActive, setActiveMenu] = useState('Followers')
  const handleMenuClick = (menu:string) => {
      setActiveMenu(menu)
  }
  return (
    <Box>
        <Box>
      <Follows handleMenuClick={handleMenuClick} 
      menuActive ={menuActive}/>
       {menuActive === "Followers" ? <Followers /> : <Following />}
      <Divider borderColor="rgba(144, 144, 144, 1)" mt="20px" />
    
    </Box>
    </Box>
  )
}

export default FollowButton
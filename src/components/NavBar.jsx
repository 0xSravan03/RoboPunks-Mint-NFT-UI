import React from 'react';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import Facebook from '../assets/social-media-icons/facebook_32x32.png'
import Twitter from '../assets/social-media-icons/twitter_32x32.png'
import Email from '../assets/social-media-icons/email_32x32.png'

const NavBar = ({accounts, setAccounts}) => {
    const isConneted = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum
                .request({ method: 'eth_requestAccounts' });
                setAccounts(accounts);
            } catch(e) {
                console.log(e.message);
            }
        }
    }

  return (
    <Flex justify="space-between" align="center" padding="30px" >
        {/* Left side - social media icons */}
        <Flex justify="space-around" width="40%" padding="0 75px">
            <Image src={Facebook} boxSize="42px" margin="0 15px" />
            <Image src={Twitter} boxSize="42px" margin="0 15px" />
            <Image src={Email} boxSize="42px" margin="0 15px" />
        </Flex>

        {/* right side account section */} 
        <Flex justify="space-around" align="center" width="40%" padding="30px">
            <Box margin="0 15px">About</Box>
            <Box margin="0 15px">Mint</Box>
            <Box margin="0 15px">Team</Box>
            {isConneted ? (<Box margin="0 15px">Connected</Box>) : 
                    (<Button
                         backgroundColor="#d6517d"
                         borderRadius="5px"
                         boxShadow="0px 2px 2px 1px #ofofof"
                         color="white"
                         cursor="pointer"
                         fontFamily="inherit"
                         padding="15px"
                         margin="0 15px"
                         onClick={connectAccount}>Connect</Button>)
                }
        </Flex>
    </Flex>
  );
}

export default NavBar;
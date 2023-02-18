import React, { useState } from 'react';
import { ethers, BigNumber } from '../ethers/ethers';
import roboPunksNFT from '../RoboPunksNFT/RoboPunksNFT.json'; 
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const roboPunksNFTAddress = "0xD989f1574608b202cd3d39d19b733AD3159404a6";

const MainMint = ({accounts, setAccounts}) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(roboPunksNFTAddress, roboPunksNFT.abi, signer);

            try {
                const txResponse = await contract.mint(BigNumber.from(mintAmount), {value: ethers.utils.parseEther((mintAmount * 0.01).toString())});
                await txResponse.wait(2)
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const handleMintDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleMintIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    }

   return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="200px">
        <Box width="520px">
            <div>
                <Text fontSize="48px" textShadow="0 5px #000000">RoboPunks</Text>
                <Text
                fontSize="30px"
                letterSpacing="-5.5%"
                fontFamily="VT323"
                textShadow="0 2px 2px #000000"
                >
                    It's 2078. Can the RoboPunks NFT save humans from destructive 
                    rampant NFT speculation? Mint RoboPunks to find out.
                </Text>
            </div>
            {
                isConnected ? (
                    <div>
                        <Flex align="center" justify="center" gap="2px">
                            <Button
                            backgroundColor="#d6517d"
                            borderRadius="5px"
                            boxShadow="0px 2px 1px #0f0f0f"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px" 
                            onClick={handleMintDecrement}>-</Button>
                            <Input
                            fontFamily="inherit"
                            width="100px"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                             type="number" value={mintAmount} readOnly />
                            <Button
                            backgroundColor="#d6517d"
                            borderRadius="5px"
                            boxShadow="0px 2px 1px #0f0f0f"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"  
                            onClick={handleMintIncrement}>+</Button>
                        </Flex>
                        <Button 
                        backgroundColor="#d6517d"
                        borderRadius="5px"
                        boxShadow="0px 2px 1px #0f0f0f"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop="10px" 
                        onClick={handleMint}>Mint Now</Button>
                    </div>
                ) : (<p>Connect your wallet to Mint.</p>)
            }
        </Box>
    </Flex>
  );
}

export default MainMint;
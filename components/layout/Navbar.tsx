import React from 'react'
import { Flex } from '@chakra-ui/react';
import AccountNavbar from './Navbar/AccountNavbar';
import Category from './Navbar/Category';

const Navbar = () => {
    
  return (
    <Flex flexDir={"column"}>
      <AccountNavbar />
      <Category />
    </Flex>
  )
}

export default Navbar
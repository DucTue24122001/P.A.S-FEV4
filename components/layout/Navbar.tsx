import React from 'react'
import { Flex } from '@chakra-ui/react';
import AccountNavbar from './Navbar/AccountNavbar';
import Category from './Navbar/Category';
import Slide from './Navbar/Slide';

const Navbar = () => {
    
  return (
    <Flex flexDir={"column"}>
      <AccountNavbar />
      <Category />
      <Slide />
    </Flex>
  )
}

export default Navbar
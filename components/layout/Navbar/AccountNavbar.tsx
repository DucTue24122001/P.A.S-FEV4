import { Center, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Marque from "./Marque";
import Language from "./Language";
import Account from "./Account";

const AccountNavbar = () => {
  return (
    <Flex
      w={"100%"}
      height={"42px"}
      bgImage={"linear-gradient(-180deg, #0C1117 0%, #162C3F 100%)"}
      pos={"relative"}
      alignItems={"center"}
    >
      <Account />
      <Marque />
      <Language />
    </Flex>
  );
};

export default AccountNavbar;

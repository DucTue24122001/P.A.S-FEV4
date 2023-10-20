import React from "react";
import { Flex } from "@chakra-ui/react";
import AccountNavbar from "./Navbar/AccountNavbar";
import Category from "./Navbar/Category";
import Slide from "./Navbar/Slide";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const checkRouter = () => {
    const page = router.asPath;
    switch (page) {
      case "/login":
        return true;

      default:
        return false;
    }
  };
  console.log(checkRouter());

  return (
    <Flex flexDir={"column"}>
      {checkRouter() !== true ? (
        <>
          <AccountNavbar />
          <Category />
          <Slide />
        </>
      ) : (
        ""
      )}
    </Flex>
  );
};

export default Navbar;

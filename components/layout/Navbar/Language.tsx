import { Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import flag_en from "../../../public/images/flag-en.webp";
import { colors } from "@/components/chakra-ui/colors";
import { AiOutlineCaretDown } from "react-icons/ai";
import icon_inbox from "../../../public/images/icon-inbox.svg"
import icon_menu from "../../../public/images/icon-menu.svg"

const Language = () => {
  const [onMouse, setOnMouse] = useState(false);
  const handleMouseEnter = () => {
    setOnMouse(true);
  };
  const handleMouseLeave = () => {
    setOnMouse(false);
  };
  return (
    <Flex w={"10%"} h={"100%"} justifyContent={"center"}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        p={"5px"}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
        bg={
          onMouse
            ? "linear-gradient(-180deg, #C2A056 15%, #625424 47%, #45391A 50%, #0c171f80 100%);"
            : ""
        }
        transition={"all .8s ease-out 0s"}
      >
        <Image w={"25px"} h={"15px"} src={flag_en.src} alt="gift" />
        <Text
          color={colors.global.primary}
          p={"0 10px"}
          fontSize={"13px"}
          fontWeight={700}
        >
          EN
        </Text>
        <AiOutlineCaretDown color={colors.global.primary} fontSize={10} />
      </Flex>
      <Flex p={"5px"} w={"50px"} h={"100%"} justifyContent={"center"} alignItems={"center"} _hover={{bg:"linear-gradient(-180deg, #C2A056 15%, #625424 47%, #45391A 50%, #0c171f80 100%);"}}>
        <Image w={"20px"} h={"18px"} objectFit={"contain"} src={icon_inbox.src} alt="gift" />
      </Flex>
      <Flex p={"5px"} w={"50px"} h={"100%"} justifyContent={"center"} alignItems={"center"} _hover={{bg:"linear-gradient(-180deg, #C2A056 15%, #625424 47%, #45391A 50%, #0c171f80 100%);"}}>
        <Image w={"20px"} h={"18px"} objectFit={"contain"} src={icon_menu.src} alt="gift" />
      </Flex>
    </Flex>
  );
};

export default Language;

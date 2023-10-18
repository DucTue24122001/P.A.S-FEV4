import { Center, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import icon_id from "../../../public/images/icon-id.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { colors } from "@/components/chakra-ui/colors";
import CopyButton from "@/components/constants/CopyButton";
import Marque from "./Marque";
import Language from "./Language";

const AccountNavbar = () => {
  const { accountDetail } = useSelector((state: RootState) => state.account);
  console.log(accountDetail);
  return (
    <Flex
      w={"100%"}
      height={"42px"}
      bgImage={"linear-gradient(-180deg, #0C1117 0%, #162C3F 100%)"}
      pos={"relative"}
      alignItems={"center"}
    >
      <Flex alignItems={"center"} w={"15%"} justifyContent={"center"}>
        <Flex>
          <Image w={"20px"} h={"20px"} src={icon_id.src} alt={"gift"} />
        </Flex>
        <Flex flexDir={"column"} ml={2}>
          <Text color={colors.global.primary} fontSize={"14px"}>
            sieutritue2412
          </Text>
          <Flex
            background={"#0b1218"}
            borderRadius={"100px"}
            padding={"0 5px"}
            justifyContent={"center"}
            alignItems={"center"}
            cursor={"pointer"}
            _hover={{ color: "#F4E0BD" }}
          >
            <Text fontSize={"13px"} color={colors.global.primary}>
              ID :
            </Text>
            <Text p={"0 10px"} color={"#fff"} fontSize={"13px"}>
              abcbabc
              {/* {accountDetail.referralCode} */}
            </Text>
            <CopyButton h="10px" copyText={accountDetail.referralCode} />
          </Flex>
        </Flex>
        <Flex ml={3}>
          <Text color={colors.global.primary} fontWeight={700}>
            $ 0.00
          </Text>
        </Flex>
      </Flex>
      <Marque />
      <Language />
    </Flex>
  );
};

export default AccountNavbar;

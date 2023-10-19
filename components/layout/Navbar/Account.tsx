import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import IconID from "../../../public/images/icon-id.svg";
import { colors } from '@/components/chakra-ui/colors';
import CopyButton from '@/components/constants/CopyButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Account = () => {
  const { accountDetail } = useSelector((state: RootState) => state.account);

  return (
    <Flex alignItems={"center"} w={"15%"} justifyContent={"center"}>
        <Flex>
          <IconID />
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
  )
}

export default Account
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import IconID from "../../../public/images/icon-id.svg";
import { colors } from '@/components/chakra-ui/colors';
import CopyButton from '@/components/constants/CopyButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { convertDecimalNum } from '@/util/function';
import Language from '../multiple-language/language';

const Account = () => {
  const { accountDetail } = useSelector((state: RootState) => state.account);
  
  return (
    <Flex  w={"100%"} justifyContent={["space-between","flex-end","flex-end","flex-end"]} alignItems={"center"}>
        <Flex alignItems={"center"}>
        <Flex>
          <IconID />
        </Flex>
        <Flex flexDir={"column"} ml={2}>
          <Text color={colors.global.primary} fontSize={"14px"}>
          {accountDetail.name}
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
              {accountDetail.referralCode}
            </Text>
            <CopyButton h="10px" copyText={accountDetail.referralCode} />
          </Flex>
        </Flex>
        </Flex>
        <Flex ml={3}>
          <Text color={colors.global.primary} fontWeight={700}>
            $ {convertDecimalNum(accountDetail.balance)}
          </Text>
        </Flex>
        <Language />
      </Flex>
  )
}

export default Account
import { Flex, Image, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { colors } from "@/components/chakra-ui/colors";
import { AiOutlineCaretDown } from "react-icons/ai";
import IconInbox from "../../../public/images/icon-inbox.svg";
import IconMenu from "../../../public/images/icon-menu.svg";
import flag_en from "../../../public/images/EN.webp";
import flag_my from "../../../public/images/MY.webp";
import { useOnHoverOutside } from "@/util/useOutsideHandler";
import { useRouter } from "next/router";

const Language = () => {
  const dropdowLanguage = useRef<any>(null);
  const dropdowToggle = useRef<any>(null);
  const [lng, setLng] = useState("EN");
  const [isDropdowMenuLanguage, setIsDropdowMenuLanguage] =
    useState<any>(false);
  const [isDropdowMenuToggle, setIsDropdowMenuToggle] = useState<any>(false);
  const router = useRouter()

  const closeHoverLanguageMenu = () => {
    setIsDropdowMenuLanguage(false);
  };
  const closeHoverToggleMenu = () => {
    setIsDropdowMenuToggle(false);
  };

  useOnHoverOutside(dropdowLanguage, closeHoverLanguageMenu);
  useOnHoverOutside(dropdowToggle, closeHoverToggleMenu);

  const handleSelectLng = (name: any) => {
    setLng(name);
  };

  return (
    <Flex w={"10%"} h={"100%"} justifyContent={"center"}>
      <Flex
        ref={dropdowLanguage}
        justifyContent={"center"}
        alignItems={"center"}
        p={"5px"}
        bg={
          isDropdowMenuLanguage
            ? "linear-gradient(-180deg, #C2A056 15%, #625424 47%, #45391A 50%, #0c171f80 100%);"
            : ""
        }
        transition={"all .8s ease-out 0s"}
        onMouseOver={() => setIsDropdowMenuLanguage(true)}
      >
        <Image w={"25px"} h={"15px"} src={`./images/${lng}.webp`} alt="gift" />
        <Text
          color={colors.global.primary}
          p={"0 10px"}
          fontSize={"13px"}
          fontWeight={700}
        >
          {lng}
        </Text>
        <AiOutlineCaretDown color={colors.global.primary} fontSize={10} />

        {isDropdowMenuLanguage && (
          <Flex
            pos={"fixed"}
            top={10}
            right={"6.2rem"}
            zIndex={1000}
            bg={"#0c151d"}
            boxShadow={"0 0 4px 0 rgba(0, 0, 0, 0.8)"}
            flexDir={"column"}
          >
            {language.map((item, i) => (
              <Flex
                key={i}
                justifyContent={"center"}
                alignItems={"center"}
                p={"12px 25px 12px 30px"}
                _hover={{
                  bg: "linear-gradient(#2D465F, #142531 , #2D465F)",
                }}
                onClick={() => handleSelectLng(item.name)}
              >
                <Image w={"20px"} h={"15px"} src={item.img} alt={item.name} />
                <Text color={"#EDD4AC"} ml={3} fontSize={"13px"} fontWeight={700}>
                  {item.name}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
      <Flex
        p={"5px"}
        w={"50px"}
        h={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        _hover={{
          bg: "linear-gradient(-180deg, #C2A056 15%, #625424 47%, #45391A 50%, #0c171f80 100%);",
        }}
        onClick={() => router.push('/inbox')}
      >
        <IconInbox />
      </Flex>
      <Flex
      ref={dropdowToggle}
        p={"5px"}
        w={"50px"}
        h={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        _hover={{
          bg: "linear-gradient(-180deg, #C2A056 15%, #625424 47%, #45391A 50%, #0c171f80 100%);",
        }}
        onMouseOver={() => setIsDropdowMenuToggle(true)}
      >
        <IconMenu />
        {isDropdowMenuToggle && (
          <Flex
            pos={"fixed"}
            top={10}
            right={0}
            zIndex={1000}
            bg={"#0c151d"}
            boxShadow={"0 0 4px 0 rgba(0, 0, 0, 0.8)"}
            flexDir={"column"}
          >
            {toggleDummy.map((item, i) => (
              <Flex
                key={i}
                // justifyContent={"center"}
                alignItems={"center"}
                p={"12px 25px 12px 30px"}
                _hover={{
                  bg: "linear-gradient(#2D465F, #142531 , #2D465F)",
                }}
                onClick={() => router.push(item.href)}
              >
                {/* <Image w={"20px"} h={"15px"} src={item.img} alt={item.name} /> */}
                <Text color={"#EDD4AC"} ml={3}>
                  {item.name}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Language;
const language = [
  { name: "EN", img: flag_en.src },
  { name: "MY", img: flag_my.src },
];
const toggleDummy = [
  { name: "Transaction Report", href:"/report" },
  { name: "Member Info", href:"" },
  { name: "Fund In/Out", href:""},
  { name: "Outstanding", href:"" },
  { name: "LOGOUT", href:"" },
];

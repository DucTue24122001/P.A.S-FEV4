import { Flex, Grid, Text, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import bg_02 from "../../../public/images/nav-bg02.png";
import SportIcon from "../../../public/nav-svg/SPORTS.svg";
import CasinoIcon from "../../../public/nav-svg/LIVE.svg";
import SlotIcon from "../../../public/nav-svg/SLOT.svg";
import FishingIcon from "../../../public/nav-svg/FH.svg";
import LotteryIcon from "../../../public/nav-svg/LOTTERY.svg";
import ArcadeIcon from "../../../public/nav-svg/ARCADE.svg";
import TableIcon from "../../../public/nav-svg/RNGTABLE.svg";
import LivearenaIcon from "../../../public/nav-svg/LIVEARENA.svg";
import httpClient from "@/components/http-client/httpClient";
import { useTenancy } from "@/components/hook/TenancyProvider";
import { accountAction } from "@/redux/account-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import IconHome from "../../../public/images/icon-home.svg";
import { colors } from "@/components/chakra-ui/colors";
import { clientAction } from "@/redux/client-slice";

const Category = () => {
  const { categoryData }: any = useSelector(
    (state: RootState) => state.account
  );
  const { gameType }: any = useSelector(
    (state: RootState) => state.client
  );
  const tenancy = useTenancy();
  const router = useRouter();
  const dispatch = useDispatch();
  const [gametype, setGametype] = useState("");
  const handleClickCategory = (gametype: any, i: any) => {
    setGametype(gametype);
    localStorage.setItem("NAV_NAME", gametype);
    dispatch(clientAction.setGameType(gametype))
  };
  const handleClickHome = () => {
    dispatch(clientAction.setGameType(""))
  }
  
  

  useEffect(() => {
    (async () => {
      try {
        const res: any = await httpClient.post(`/MPS/ByGameTypeAndPlatform`, {
          platform: "",
          gametype: "",
          tenancyName: tenancy?.tenancyName,
        });
        dispatch(accountAction.setCategoryData(res.result));
        setGametype(res.result.gameType[0].game_type);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  function getIconFromGameType(gameType: any) {
    switch (gameType) {
      case "SPORTS":
        return (
          <SportIcon
            width={"45px"}
            height={"45px"}
            viewBox="0 0 32 32"
            fill={"#e5c25e"}
          />
        );
      case "LIVE":
        return (
          <CasinoIcon
            width={"45px"}
            height={"45px"}
            viewBox="0 0 32 32"
            fill={"#e5c25e"}
          />
        );
      case "SLOT":
        return (
          <SlotIcon
            width={"45px"}
            height={"45px"}
            viewBox="0 0 32 32"
            fill={"#e5c25e"}
          />
        );
      case "FH":
        return (
          <FishingIcon
            width={"45px"}
            height={"45px"}
            viewBox="0 0 32 32"
            fill={"#e5c25e"}
          />
        );

      case "LOTTERY":
        return (
          <LotteryIcon
            width={"45px"}
            height={"45px"}
            viewBox="0 0 32 32"
            fill={"#e5c25e"}
          />
        );

      case "ARCADE":
        return (
          <ArcadeIcon
            width={"45px"}
            height={"45px"}
            viewBox="0 0 32 32"
            fill={"#e5c25e"}
          />
        );

      case "RNGTABLE":
        return (
          <TableIcon
            width={"45px"}
            height={"45px"}
            viewBox="0 0 32 32"
            fill={"#e5c25e"}
          />
        );

      case "LIVEARENA":
        return (
          <LivearenaIcon
            width={"45px"}
            height={"45px"}
            viewBox="0 0 32 32"
            fill={"#e5c25e"}
          />
        );

      default:
        return <></>;
    }
  }
  return (
    <Flex
      w={"100%"}
      pos={["relative","relative","relative","sticky"]}
      top={[0,0,0,90]}
      zIndex={1000}
      height={"90px"}
      bg={
        "linear-gradient(-180deg, #2D465F 15%, #142531 47%, #0B1720 50%, #0C171F 100%)"
      }
    >
      <Flex
        bgImage={bg_02.src}
        bgRepeat={"no-repeat"}
        w={"100%"}
        h={"100%"}
        bgPos={"right"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex
          w={"1024px"}
          h={"100%"}
          // templateColumns={"repeat(6, 1fr)"}
          overflowX={["scroll", "scroll", "scroll", "unset"]}
          gap={0}
        >
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            display={"inline-block"}
            padding={"10px 25px"}
            borderLeft={"1px solid #03110a"}
            borderRight={"1px solid #03110a"}
            bgImage={
              gameType === ""
                ? "linear-gradient(-180deg, #C2A056 15%, #625424 47%, #45391A 50%, #0C171F 100%)"
                : ""
            }
            _hover={{
              bg: "linear-gradient(180deg, #bd9b2a96 0%, #45370916 100%)",
            }}
            onClick={handleClickHome}
          >
            <IconHome width={"45px"} height={"45px"} fill={"#e5c25e"} />
            <Text
              color={colors.global.primary}
              textTransform={"uppercase"}
              display={"block"}
              fontSize={"14px"}
              fontWeight={400}
              textShadow={"0 0 4px #d09926"}
            >
              Home
            </Text>
          </Flex>
          {categoryData?.gameType?.map((item: any, i: any) => (
            <Flex
              key={i}
              justifyContent={"center"}
              alignItems={"center"}
              flexDir={"column"}
              display={"inline-block"}
              p={"10px 10px"}
              textAlign={"center"}
              cursor={"pointer"}
              borderLeft={"1px solid #03110a"}
              // borderRight={"1px solid #03110a"}
              transition={"all 0.3 ease-out"}
              onClick={() => handleClickCategory(item.game_type, i)}
              _hover={{
                bg: "linear-gradient(180deg, #bd9b2a96 0%, #45370916 100%)",
              }}
              bg={
                gameType === item.game_type
                  ? "linear-gradient(-180deg, #C2A056 15%, #625424 47%, #45391A 50%, #0C171F 100%)"
                  : ""
              }
            >
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
              >
                {getIconFromGameType(item.game_type)}
              </Flex>
              <Text
                color={colors.global.primary}
                textTransform={"uppercase"}
                display={"block"}
                fontSize={"14px"}
                fontWeight={400}
                textShadow={"0 0 4px #d09926"}
              >
                {item.game_type_name}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Category;

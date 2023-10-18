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
import logo from "../../../public/images/logo.jpg";
import icon_home from "../../../public/images/icon-home.svg";
import { colors } from "@/components/chakra-ui/colors";

const Category = () => {
  const { categoryData }: any = useSelector(
    (state: RootState) => state.account
  );
  const tenancy = useTenancy();
  const [gametype, setGametype] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClickCategory = (gametype: any) => {
    setGametype(gametype);
    localStorage.setItem("NAV_NAME", gametype);
    router.push(`/category/${gametype}`);
  };

  console.log(gametype);

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
            width={["20", "50", "50", "100"]}
            height={["44", "88", "88", "88"]}
            viewBox="0 0 32 32"
            fill={"#44e42e"}
          />
        );
      case "LIVE":
        return (
          <CasinoIcon
            width={["20", "50", "50", "100"]}
            height={["44", "88", "88", "88"]}
            viewBox="0 0 32 32"
            fill={"#44e42e"}
          />
        );
      case "SLOT":
        return (
          <SlotIcon
            width={["20", "50", "50", "100"]}
            height={["44", "88", "88", "88"]}
            viewBox="0 0 32 32"
            fill={"#44e42e"}
          />
        );
      case "FH":
        return (
          <FishingIcon
            width={["20", "50", "50", "100"]}
            height={["44", "88", "88", "88"]}
            viewBox="0 0 32 32"
            fill={"#44e42e"}
          />
        );

      case "LOTTERY":
        return (
          <LotteryIcon
            width={["20", "50", "50", "100"]}
            height={["44", "88", "88", "88"]}
            viewBox="0 0 32 32"
            fill={"#44e42e"}
          />
        );

      case "ARCADE":
        return (
          <ArcadeIcon
            width={["20", "50", "50", "100"]}
            height={["44", "88", "88", "88"]}
            viewBox="0 0 32 32"
            fill={"#44e42e"}
          />
        );

      case "RNGTABLE":
        return (
          <TableIcon
            width={["20", "50", "50", "100"]}
            height={["44", "88", "88", "88"]}
            viewBox="0 0 32 32"
            fill={"#44e42e"}
          />
        );

      case "LIVEARENA":
        return (
          <LivearenaIcon
            width={["20", "20", "20", "100"]}
            height={["44", "44", "44", "88"]}
            viewBox="0 0 32 32"
            fill={"#44e42e"}
          />
        );

      default:
        return <></>;
    }
  }
  return (
    <Flex
      pos={"relative"}
      w={"100%"}
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
        <Grid
          maxW={"1400px"}
          h={"100%"}
          templateColumns={"repeat(10, 1fr)"}
          overflowX={["scroll", "scroll", "scroll", "unset"]}
          gap={0}
        >
          <Flex padding={"0.7rem 15px 0"}>
            <Image
              w={"73px"}
              h={"70px"}
              objectFit={"contain"}
              src={logo.src}
              alt="gift"
            />
          </Flex>
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"0.7rem 15px 0"}
          >
            <Image
              w={"53px"}
              h={"50px"}
              objectFit={"contain"}
              src={icon_home.src}
              alt="gift"
            />
            <Text color={colors.global.primary}>Home</Text>
          </Flex>
          {categoryData?.gameType?.map((item: any, i: any) => (
            <Flex
              key={i}
              justifyContent={"center"}
              alignItems={"center"}
              flexDir={"column"}
              bg={
                // router.query.page !== item.game_type
                //   ?
                "linear-gradient(180deg, #bd9b2a96 0%, #45370916 100%)"
                //   : ""
              }
              padding={"0.7rem 15px 0"}
              display={"inline-block"}
              textAlign={"center"}
              cursor={"pointer"}
              border={
                router !== item.game_type
                  ? "1px solid #03110a"
                  : "1px solid #0a502b"
              }
              transition={"all 0.3 ease-out"}
              onClick={() => handleClickCategory(item.game_type)}
              w={["80px", "100px", "100px", "auto"]}
            >
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                p={"20px 20px"}
              >
                {getIconFromGameType(item.game_type)}
              </Flex>
              <Text
                color={colors.global.primary}
                textTransform={"uppercase"}
                display={"block"}
                fontSize={"12px"}
                fontWeight={400}
                textShadow={"0 0 4px #00d741"}
              >
                {item.game_type_name}
              </Text>
            </Flex>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Category;

import { useTenancy } from "@/components/hook/TenancyProvider";
import httpClient from "@/components/http-client/httpClient";
import { RootState } from "@/redux/store";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameSelectItem from "./GameSelectItem";
import { clientAction } from "@/redux/client-slice";

const GameSelect = () => {
  const { categoryData }: any = useSelector(
    (state: RootState) => state.account
  );
  const [isData, setIsData] = useState([]);
  const tenancy = useTenancy();
  const dispatch = useDispatch();
  const router = useRouter();
  const { gameType, platform } = useSelector(
    (state: RootState) => state.client
  );

  const findGameType: any = categoryData?.gameType?.find(
    (item: any) => item?.game_type === gameType
  );

  const handleClick = async (platform: any) => {
    dispatch(clientAction.setPlatform(platform));
    try {
      const res: any = await httpClient.post(`/MPS/ByGameTypeAndPlatform`, {
        platform: platform,
        gametype: gameType,
        status: "",
        tenancyName: tenancy?.tenancyName,
      });
      setIsData(res?.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {platform !== "" ? (
        <GameSelectItem isData={isData} findGameType={findGameType} />
      ) : (
        <Flex
          w={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          pb={20}
          pt={5}
          px={[2, 2, 2, 0]}
        >
          <Grid
            mt={2}
            mb={5}
            templateColumns={[
              "repeat(3, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={[2, 3, 5, 5]}
          >
            <>
              {findGameType?.platforms.map((platform: any, i: number) => (
                <Box
                  key={i}
                  bgColor={"#fff"}
                  borderRadius={10}
                  boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
                  onClick={() => handleClick(platform.platform)}
                  cursor={"pointer"}
                >
                  <Image
                    alt={"gameImg"}
                    w={"100%"}
                    h={["112px", "140px", "173px", "209px"]}
                    borderTopRightRadius={5}
                    borderTopLeftRadius={5}
                    objectFit={"contain"}
                    src={`https://pasystem.s3.ap-southeast-1.amazonaws.com/platforms/${platform.platform}.jpg`}
                  />
                  <Flex
                    borderBottomRightRadius={5}
                    borderBottomLeftRadius={5}
                    justifyContent={"center"}
                    w={"100%"}
                    p={["5px 15px", "10px 15px", "10px 15px", "10px 15px"]}
                    fontSize={["10px", "14px", "14px", "16px"]}
                    fontWeight={[0, 700, 700, 700]}
                  >
                    <Text color={"#000000F5"} noOfLines={1}>
                      {platform.platform_name}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </>
          </Grid>
        </Flex>
      )}
    </>
  );
};

export default GameSelect;

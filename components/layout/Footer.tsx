import React, { useMemo } from "react";
import { colors } from "../chakra-ui/colors";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ClientService from "../http-client/ClientService";
import { useTenancy } from "../hook/TenancyProvider";
import { useTranslation } from "react-i18next";
import { Flex, Text } from "@chakra-ui/react";
import { clientAction } from "@/redux/client-slice";
import { PageEnum } from "../constants/enum";
import { AiOutlineHome } from "react-icons/ai";
import { checkCurrentRouter } from "../hook/checkCurrentRouter";
import { BsWallet } from "react-icons/bs";
import { FiGift } from "react-icons/fi";
import { RiBankFill } from "react-icons/ri";
import { HiMenuAlt2 } from "react-icons/hi";

const Footer = () => {
  const router = useRouter();
  const { inboxMails } = useSelector((state: RootState) => state.account);
  const currentRouter = checkCurrentRouter(router);
  const isLogin = ClientService.isAuthenticated();
  const dispatch = useDispatch();
  const tenancy = useTenancy();
  // checkRouterChange(router);
  const { t } = useTranslation();

  const unreadMail = useMemo(() => {
    const unread = inboxMails.filter((mail) => mail.status === false).length;
    switch (true) {
      case unread === 0:
        return null;
      case unread > 99:
        return (
          <Text sx={mailNoti} pos={"absolute"}>
            99<sup>+</sup>
          </Text>
        );
      case unread <= 99:
        return (
          <Text sx={mailNoti} pos={"absolute"}>
            {unread}
          </Text>
        );
    }
  }, [inboxMails]);

  const directRouter = (url: string) => {
    if (isLogin) {
      router.push(url);
    } else {
      dispatch(clientAction.handleShowLoginModal(true));
    }
  };
  const checkRouter = () => {
    const pages = router.asPath;
    switch (pages) {
      case "/login":
        return true;
      case "/signup":
        return true;

      default:
        return false;
    }
  };

  return (
    <>
      {checkRouter() !== true ? (
        <Flex
          alignItems={"center"}
          justifyContent={"space-around"}
          bg={"linear-gradient(0deg, #0C151D 4%, #182A3B 100%)"}
          color={"rgba(255, 255, 255, 0.7)"}
          height={"65px"}
          zIndex={1300}
          w={"100%"}
          pos={"fixed"}
          borderTop={"1px solid rgba(255, 255, 255, 0.7)"}
          bottom={0}
        >
          <Flex
            sx={menuItem}
            color={
              router.asPath === "/"
                ? tenancy?.mainColor || colors.primary
                : "rgba(255, 255, 255, 0.7)"
            }
            onClick={() => {
              router.push("/");
            }}
          >
            <AiOutlineHome />
            <Text fontSize={"12px"} textTransform={"uppercase"}>
              {t("home")}
            </Text>
          </Flex>
          <Flex
            sx={menuItem}
            color={
              currentRouter === PageEnum.Promo
                ? tenancy?.mainColor || colors.primary
                : "rgba(255, 255, 255, 0.7)"
            }
            onClick={() => router.push(`/${PageEnum.Promo}`)}
            pos={"relative"}
          >
            <FiGift />
            <Text fontSize={"12px"} textTransform={"uppercase"}>
              {t("promo")}
            </Text>
          </Flex>
          <Flex
            sx={menuItem}
            color={
              currentRouter === PageEnum.Deposit
                ? tenancy?.mainColor || colors.primary
                : "rgba(255, 255, 255, 0.7)"
            }
            onClick={() =>
              directRouter(`/${PageEnum.Account}/${PageEnum.Deposit}`)
            }
          >
            <RiBankFill />
            <Text fontSize={"12px"} textTransform={"uppercase"}>
              {t("deposit")}
            </Text>
          </Flex>
          <Flex
            sx={menuItem}
            color={
              currentRouter === PageEnum.Withdraw
                ? tenancy?.mainColor || colors.primary
                : "rgba(255, 255, 255, 0.7)"
            }
            onClick={() =>
              directRouter(`/${PageEnum.Account}/${PageEnum.Withdraw}`)
            }
          >
            <BsWallet />
            <Text fontSize={"12px"} textTransform={"uppercase"}>
              {t("withdraw")}
            </Text>
          </Flex>
          {/* <Flex
        sx={menuItem}
        color={
          currentRouter === PageEnum.Withdraw
            ? (tenancy?.mainColor || colors.primary)
            : "rgba(255, 255, 255, 0.7)"
        }
      >
        <FaCrown />
        <Text fontSize={"12px"} textTransform={"uppercase"}>VIP</Text>
      </Flex> */}
          <Flex
            sx={menuItem}
            color={
              currentRouter === PageEnum.More
                ? tenancy?.mainColor || colors.primary
                : "rgba(255, 255, 255, 0.7)"
            }
            onClick={() => directRouter(`/${PageEnum.More}`)}
          >
            <Flex pos={"relative"} sx={menuItem}>
              <HiMenuAlt2 />
              <Text fontSize={"12px"} textTransform={"uppercase"}>
                {t("more")}
              </Text>
              {unreadMail}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        ""
      )}
    </>
  );
};

export default Footer;
const menuItem = {
  fontSize: "24px",
  flexDir: "column",
  alignItems: "center",
  cursor: "pointer",
  minW: "20%",
};
const mailNoti = {
  border: 0,
  bgColor: colors.default.lightRed,
  borderRadius: "24px",
  fontSize: "14px",
  right: "5px",
  top: "0px",
  boxSize: "24px",
  transform: "scale(.75)",
  textAlign: "center",
  transformOrigin: "80px -20px",
  mixBlendMode: "normal",
  lineHeight: "24px",
  color: colors.default.white,
};

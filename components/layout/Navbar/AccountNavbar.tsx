import { Center, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import Marque from "./Marque";
import Language from "./Language";
import Account from "./Account";
import { useTenancy } from "@/components/hook/TenancyProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import ClientService from "@/components/http-client/ClientService";
import httpClient from "@/components/http-client/httpClient";
import { accountAction } from "@/redux/account-slice";
import { clientAction } from "@/redux/client-slice";

const AccountNavbar = () => {
  const {language} = useSelector((state: RootState) => state.client)
  const {token} = useSelector((state: RootState) => state.account)
  const router = useRouter()
  const tenancy = useTenancy()
  const {i18n} = useTranslation()
  const dispatch = useDispatch()
   
  useEffect(() => {
    if(ClientService.isAuthenticated()) {
      (async () => {
        try {
          const data: any = await httpClient.get("/Account/GetProfile")
          dispatch(accountAction.setAccountDetail(data.result))
        } catch (err) {
          console.log(err);
        } finally {
          
        }
      })()
    }
  }, [token])

  // useEffect(() => {
  //   if(tenancy?.lang) {
  //     const langList = tenancy.lang.split(",");
  //     dispatch(clientAction.setLanguageList(langList))
  //     const currentLang = window.localStorage.getItem("MY_LANGUAGE");
  //     if (!currentLang) {
  //       const primaryLang = langList.find((lang) => lang !== "EN")
  //       dispatch(clientAction.setLanguage(primaryLang));
  //       i18n.changeLanguage(primaryLang);
  //     } else {
  //       dispatch(clientAction.setLanguage(currentLang));
  //       i18n.changeLanguage(currentLang);
  //     }
  //   } else {
  //     i18n.changeLanguage("EN");
  //   }
  // }, [tenancy])

  // const currentLangImg = useMemo(() => {
  //   switch (true) {
  //     case language === "EN":
  //       return langUkImg.src
  //     case language === "MY":
  //       return langMmImg.src
  //     case language === "KM":
  //       return langKmImg.src
  //     default:
  //       return langUkImg.src
  //   }
  // }, [language])
  
  return (
    <Flex
      w={"100%"}
      height={"42px"}
      bgImage={"linear-gradient(-180deg, #0C1117 0%, #162C3F 100%)"}
      pos={"relative"}
      alignItems={"center"}
    >
      <Account />
      {/* <Marque /> */}
      <Language />
    </Flex>
  );
};

export default AccountNavbar;

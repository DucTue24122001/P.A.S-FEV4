import React, { useEffect } from "react";

import LoginAction from "../login/LoginAction";
import { useRouter } from "next/router";
import ClientService from "../http-client/ClientService";
import httpClient from "../http-client/httpClient";
import { accountAction } from "@/redux/account-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {token} = useSelector((state:RootState) => state.account)
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
        <LoginAction />
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;


import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Image,
  Link,
  Text,
  color,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import logo from "../../public/images/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useBreakpoint } from "../hook/useBreakpoint";
import ClientService from "../http-client/ClientService";
import { RootState } from "@/redux/store";
import { useTranslation } from "react-i18next";
import { useTenancy } from "../hook/TenancyProvider";
import { clientAction } from "@/redux/client-slice";
import httpClient from "../http-client/httpClient";
import { DefaultInput } from "../constants/DefaultInput";
import { LoginFormEnum } from "../constants/enum";
import DefaultInputPassword from "../constants/DefaultInputPassword";
import { colors } from "../chakra-ui/colors";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isBreakpoint = useBreakpoint(840);
  const rememberMe = ClientService.getRememberMe();
  const { loginForm, isCheckRemember } = useSelector(
    (state: RootState) => state.client
  );
  const [isError, setIsError] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const tenancy = useTenancy();

  useEffect(() => {
    dispatch(
      clientAction.setRememberMeLogin({
        username: rememberMe ? rememberMe.username : "",
        password: rememberMe ? rememberMe.password : "",
      })
    );
    dispatch(
      clientAction.setIsCheckRemember(
        rememberMe ? rememberMe.isCheckRemember : false
      )
    );
  }, []);

  const loginInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(clientAction.setLoginForm({ name, value }));
  };

  const loginHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!loginForm.usernameOrEmailAddress || !loginForm.password) {
      setIsError(t("username_password_required"));
      return;
    }
    setIsLoading(true);
    try {
      const data: any = await httpClient.post("/account/login", {
        ...loginForm,
        TenancyName: tenancy?.tenancyName,
      });

      if (data.error) {
        setIsError(data.error.message);
      } else {
        if (isCheckRemember) {
          ClientService.saveRememberMe({
            username: loginForm.usernameOrEmailAddress,
            password: loginForm.password,
            isCheckRemember,
          });
        } else {
          ClientService.unsaveRememberMe();
        }
        if (data.result.token) {
          ClientService.login(data.result.token);
          router.push("/");
        } else {
          // dispatch(clientAction.handleShowRegistOldAccountModal(true));
          dispatch(
            clientAction.setOldAccountRegistInfo({
              ...data.result,
              emailAddress: data.result.userName + "@default.com",
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkRouter = () => {
    const pages = router.asPath;
    switch (pages) {
      case "/login":
        return true;

      default:
        return false;
    }
  };

  return (
    <>
      {checkRouter() !== true ? (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Flex
            w={"1024px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={"10px 20px"}
          >
            <Flex cursor={"pointer"} onClick={() => router.push("/")}>
              <Image
                w={"73px"}
                h={"70px"}
                objectFit={"contain"}
                src={logo.src}
                alt="gift"
              />
            </Flex>

            <Flex>
              <form onSubmit={loginHandler}>
                <Flex gap={2} alignItems={"center"}>
                  <Box
                    position={"relative"}
                    display={["none", "none", "none", "block"]}
                  >
                    <DefaultInput
                      w={"200px"}
                      placeholder={t("username")}
                      value={loginForm.usernameOrEmailAddress}
                      tabIndex={1}
                      name={LoginFormEnum.Username}
                      borderColor={"#fff"}
                      onChange={loginInputHandler}
                    />
                    <Center
                      position={"absolute"}
                      color={colors.check}
                      right={0}
                    >
                      <Checkbox
                        size="sm"
                        bottom={0}
                        colorScheme="yellow"
                        isChecked={isCheckRemember}
                        color={colors.global.primary}
                        onChange={(e) =>
                          dispatch(
                            clientAction.setIsCheckRemember(e.target.checked)
                          )
                        }
                      >
                        {t("Remember")}
                      </Checkbox>
                    </Center>
                  </Box>
                  <Flex
                    position={"relative"}
                    display={["none", "none", "none", "block"]}
                  >
                    <DefaultInputPassword
                      value={loginForm.password}
                      w={"200px"}
                      placeholder={t("password")}
                      tabIndex={2}
                      name={LoginFormEnum.Password}
                      borderColor={colors.default.white}
                      onChange={loginInputHandler}
                    />
                    {isError && (
                      <Text
                        position={"absolute"}
                        right={0}
                        top={-5}
                        textAlign={"end"}
                        w={"500px"}
                        fontSize={"sm"}
                        color={colors.error}
                      >
                        {isError}
                      </Text>
                    )}
                    <Link
                      position={"absolute"}
                      fontSize={"sm"}
                      color={colors.global.primary}
                      right={0}
                      // onClick={() =>
                      //   dispatch(clientAction.handleShowForgotPwModal(true))
                      // }
                    >
                      {t("Forgot_Password")}
                    </Link>
                  </Flex>
                  <Button
                    _hover={{ bg: colors.secondary }}
                    display={["block", "block", "block", "none"]}
                    bgColor={"#fff"}
                    sx={navButton}
                    color={"#000"}
                    isLoading={isLoading}
                    onClick={() => router.push("/login")}
                    textTransform={"uppercase"}
                  >
                    {t("Login")}
                  </Button>
                  <Button
                    _hover={{ filter: "brightness(110%)" }}
                    display={["none", "none", "none", "block"]}
                    bgImage={
                      "linear-gradient(180deg, #f09c1a 25%, #feff83 100%)"
                    }
                    sx={navButton}
                    color={colors.default.white}
                    type="submit"
                    isLoading={isLoading}
                    textTransform={"uppercase"}
                  >
                    {t("Login")}
                  </Button>
                  <Button
                    _hover={{ bg: "transparent" }}
                    bgColor={"transparent"}
                    sx={navButton}
                    borderWidth={2}
                    borderColor={["#fff", "#fff", "#fff", "#E1BE83"]}
                    color={"#fff"}
                    textTransform={"uppercase"}
                    onClick={() =>
                      isBreakpoint
                        ? router.push("/signup")
                        : router.push("/signup")
                    }
                  >
                    {t("join_now")}
                  </Button>
                </Flex>
              </form>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
const navButton = {
  fontSize: ["12px", "12px", "12px", "15px"],
  w: ["fit-content", "fit-content", "fit-content", "135px"],
  fontWeight: "bold",
};

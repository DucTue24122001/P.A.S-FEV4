import {
  Box,
  Center,
  Checkbox,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import bg_login from "../public/images/bg_login.png";
import Slider from "react-slick";
import king1 from "../public/images/king1.png";
import king2 from "../public/images/king2.png";
import king3 from "../public/images/king3.png";
import king4 from "../public/images/king4.png";
import logo from "../public/images/logo.jpg";
import ClientService from "@/components/http-client/ClientService";
import { useTenancy } from "@/components/hook/TenancyProvider";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import httpClient from "@/components/http-client/httpClient";
import { accountAction } from "@/redux/account-slice";
import { colors } from "@/components/chakra-ui/colors";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    usernameOrEmailAddress: "",
    password: "",
  });
  const [isError, setIsError] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const rememberMe = ClientService.getRememberMe();
  const [isCheckRemember, setIsCheckRemember] = useState(false);
  const tenancy = useTenancy();
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoginForm({
      usernameOrEmailAddress: rememberMe ? rememberMe.username : "",
      password: rememberMe ? rememberMe.password : "",
    });
    setIsCheckRemember(rememberMe ? rememberMe.isCheckRemember : false);
  }, []);

  const loginInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
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
      dispatch(accountAction.setToken(data.result.token))
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
          dispatch(accountAction.setToken(data.result.token));
          router.push("/");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBack = () => {
    if(typeof window !== undefined){
      window.history.back()
    }
  }

  return (
    <Box
      w={"100%"}
      h={"100vh"}
      bgImage={bg_login.src}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      pos={"relative"}
    >
      <Box zIndex={1000000} p={"5px 12px"} bg={"linear-gradient(180deg, #f09c1a 25%, #feff83 100%)"} boxShadow={"0 0 10px #ffeb3b"} pos={"absolute"} right={[5,10,10,10]} top={[5,10,10,10]} cursor={"pointer"} onClick={handleBack} >
        <CloseIcon color={"#fff"} fontSize={13} />
      </Box>
      <Box
        pos={"relative"}
        w={["100%", "100%", "100%", "1400px"]}
        margin={"auto"}
      >
        <Flex
          pos={["relative", "relative", "relative", "absolute"]}
          zIndex={10}
          top={5}
          left={["0", "0", "0", "1rem"]}
          margin={"auto"}
          justifyContent={"center"}
        >
          <Image w={"100px"} h={"100px"} src={logo.src} alt="gift" />
        </Flex>

        <Box
          pos={["relative", "relative", "relative", "absolute"]}
          top={10}
          right={["0", "0", "0", "1rem"]}
          zIndex={10}
          bg={"#f0f8ff91"}
          border={"6px solid rgba(255, 255, 255, 0.9)"}
          w={["80%", "100%", "45%", "25%"]}
          borderRadius={20}
          margin={"auto"}
          mb={20}
        >
          <Box className="layout">
            <Box p={"10px 15px"} maxW={"550px"} mx={"auto"}>
              <form onSubmit={loginHandler}>
                <Box m={"20px 0 20px"}>
                  {/* <Link onClick={() => router.push("/")}>
                    <Image
                      alt="logo"
                      src={logo.src}
                      minW={"160px"}
                      maxW={"240px"}
                      w={"40%"}
                      mx={"auto"}
                    />
                  </Link> */}
                  <Heading
                    as={"h5"}
                    // className="text_vip"
                    my={"0.8rem"}
                    fontSize={"18px"}
                    fontWeight={500}
                    textAlign={"center"}
                    textTransform={"uppercase"}
                    color={colors.global.primary}
                  >
                    {t("login")}
                  </Heading>
                </Box>
                <Box sx={labelContainer}>
                  <label htmlFor="user" className="text-vip">
                    <Text className="text_vip" mb={"5px"}>
                      {t("username")}
                    </Text>
                  </label>
                  <Input
                    variant={"default"}
                    id="user"
                    name={"usernameOrEmailAddress"}
                    placeholder={t("username") + " " + "#"}
                    fontSize={14}
                    letterSpacing={"1px"}
                    value={loginForm.usernameOrEmailAddress}
                    autoComplete="none"
                    onChange={loginInputHandler}
                  />
                </Box>
                <Box sx={labelContainer}>
                  <label htmlFor="password" className="text-vip">
                    <Text className="text_vip" mb={"5px"}>
                      {t("password")}
                    </Text>
                  </label>
                  <Input
                    variant={"default"}
                    type="password"
                    id="password"
                    name={"password"}
                    placeholder={t("password") + " " + "#"}
                    fontSize={14}
                    letterSpacing={"1px"}
                    value={loginForm.password}
                    onChange={loginInputHandler}
                  />
                </Box>
                <Box sx={labelContainer} className="text_vip">
                  <Checkbox
                    fontSize={"14px"}
                    colorScheme="yellow"
                    outline={"none"}
                    isChecked={isCheckRemember}
                    onChange={(e) => setIsCheckRemember(e.target.checked)}
                  >
                    {t("Remember")}
                  </Checkbox>
                </Box>
                <Box
                  w={"100%"}
                  px={"15px"}
                  pt={"10px"}
                  transition={"all .1s ease-in-out"}
                  borderRadius={"20px"}
                  _hover={{ filter: "brightness(110%)" }}
                >
                  <button className="login_btn" type={"submit"}>
                    {isLoading ? <Spinner /> : t("login")}
                  </button>
                </Box>
                {isError && (
                  <Text textAlign={"center"} color={"global.error"} mt={"10px"}>
                    {isError}
                  </Text>
                )}
              </form>
            </Box>
            <Box>
              <Center>
                <Link
                  textAlign={"center"}
                  color={"#000"}
                  fontSize={"14px"}
                  cursor={"pointer"}
                  mb={2}
                >
                  {t("Forgot_Password")}
                </Link>
              </Center>
              <Flex
                gap={1}
                alignItems={"center"}
                justifyContent={"center"}
                color={"#000"}
                fontSize={"14px"}
              >
                <Text>{t("not_a_member")},</Text>
                <Link onClick={() => router.push("/register")}>
                  {t("register")}
                </Link>
              </Flex>
            </Box>
          </Box>
        </Box>

        <Box display={["none","none","block","block"]}>
          <Slider
            className="home-slider"
            dots={true}
            infinite={true}
            slidesToScroll={1}
            slidesToShow={1}
            arrows={false}
            autoplay={true}
            autoplaySpeed={3000}
            appendDots={(dots) => (
              <Box
                pos={"absolute"}
                top={["70%", "70%", "85%", "90%"]}
                h={"10px"}
              >
                {dots}
              </Box>
            )}
          >
            {slideDummy.map((item, i) => (
              <Flex key={i}>
                <Flex w={"100%"} justifyContent={"center"}>
                  <Image
                    borderBottomLeftRadius={10}
                    borderBottomRightRadius={10}
                    w={["100%", "100%", "100%", "1400px"]}
                    h={["100%", "100%", "100%", "600px"]}
                    src={item.img}
                    objectFit={"cover"}
                    alt="gift"
                  />
                </Flex>
              </Flex>
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
const slideDummy = [
  {
    img: king1.src,
  },
  {
    img: king2.src,
  },
  {
    img: king3.src,
  },
  {
    img: king4.src,
  },
];
const labelContainer = {
  w: "100%",
  px: "15px",
  mb: "20px",
};

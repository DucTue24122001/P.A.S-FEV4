import {
  Box,
  Checkbox,
  Flex,
  Image,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import bg_login from "../public/images/bg_login.png";
import { CloseIcon } from "@chakra-ui/icons";
import { useTenancy } from "@/components/hook/TenancyProvider";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from "axios";
import httpClient from "@/components/http-client/httpClient";
import ClientService from "@/components/http-client/ClientService";
import { clientAction } from "@/redux/client-slice";
import DefaultSelect from "@/components/constants/DefaultSelect";
import { DefaultInput } from "@/components/constants/DefaultInput";
import {
  PageEnum,
  PoliciesEnum,
  RegistFormEnum,
} from "@/components/constants/enum";
import DefaultInputPassword from "@/components/constants/DefaultInputPassword";
import { colors } from "@/components/chakra-ui/colors";
import DefaultButton from "@/components/constants/DefaultButton";
import logo from "../public/images/logo.jpg";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const tenancy = useTenancy();
  const { t } = useTranslation();
  const [registForm, setRegistForm] = useState({
    userName: "",
    name: "",
    phoneNumber: "",
    password: "",
    emailAddress: "",
    ReferralCode: "",
  });
  const [isHaveReferralCode, setIsHaveReferralCode] = useState(false);
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  });
  const [confirmPass, setConfirmPass] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [errorPw, setErrorPw] = useState("");
  const [errorForm, setErrorForm] = useState({
    user: "",
    name: "",
    phone: "",
    // email: "",
  });
  const [isError, setIsError] = useState(false);
  const [isPwError, setIsPwError] = useState(false);
  const dispatch = useDispatch();
  const [imgLogo, setImgLogo] = useState(<></>);

  const resetForm = () => {
    setRegistForm({
      ...registForm,
      userName: "",
      name: "",
      phoneNumber: "",
      password: "",
      emailAddress: "",
    });
    setConfirmPass("");
  };

  useEffect(() => {
    (async () => {
      try {
        const res: any = await axios.get(tenancy?.logo + "logo2.png");
        if (res.status == 200) {
          //if(statusText == OK)
          setImgLogo(
            <Image
              src={tenancy?.logo + "logo2.png"}
              w={100}
              mb={2}
              alt="logo"
            />
          );
        }
      } catch (err) {
        console.log(err);
        setImgLogo(
          <>
            <Image
              src={tenancy?.logo + "logo1.png"}
              w={150}
              mb={2}
              alt="logo"
            />
          </>
        );
      }
    })();
  }, [tenancy]);

  useEffect(() => {
    setErrorForm({
      ...errorForm,
      user: registForm.userName ? "" : t("username_required"),
      phone: registForm.phoneNumber ? "" : t("phone_number_required"),
      name: registForm.name ? "" : t("name_required"),
      // email: registForm.emailAddress ? "" : "Email is required",
    });
    setErrorPw(() => {
      switch (false) {
        case !restrictSpecialExp.test(registForm.password):
          return t("your_password_must_not_have_special_character");
        case minMaxLengthRegExp.test(registForm.password):
          return t("your_password_maximum");
        case uppercaseRegExp.test(registForm.password) &&
          lowercaseRegExp.test(registForm.password):
          return t("your_password_uppercase_lowercase");
        case digitsRegExp.test(registForm.password):
          return t("your_password_least_one");
        case registForm.password === confirmPass:
          return t("your_confirm_password_not_match");
        default:
          return "";
      }
    });
  }, [registForm, confirmPass, tenancy]);

  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, validity } = e.target;

    if (validity.valid) {
      setRegistForm({ ...registForm, [name]: value });
    }
  };

  const submitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const isFormValid = Object.values(errorForm).every(
      (item) => item.length === 0
    );
    if (errorPw || !isFormValid) {
      setIsError(true);
      return;
    }
    setIsLoading(true);
    try {
      const res: any = await httpClient.post("/Account/Register", {
        ...registForm,
        phoneNumber: "+" + tenancy?.areaCode + registForm.phoneNumber,
        emailAddress: registForm.userName + "@default.com",
        tenancyName: tenancy?.tenancyName,
      });
      if (res.success) {
        ClientService.login(res.result.token);
        toast({
          status: "success",
          title: t("account_has_been_created"),
        });
        // dispatch(clientAction.handleShowRegisterModal(false));
        resetForm();
        setError("");
        router.push("/");
      } else {
        setIsError(true);
        setError(res.error.message);
      }
    } catch (err: any) {
      console.log(err);
      toast({
        status: "error",
        title: err?.response?.data?.error?.message || t("something_went_wrong"),
      });
    } finally {
      setIsLoading(false);
      setIsError(false);
    }
  };
  const handleBack = () => {
    if (typeof window !== undefined) {
      window.history.back();
    }
  };
  return (
    <Box
      w={"100%"}
      h={["100%","100%","100vh","100vh"]}
      bgImage={bg_login.src}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      pos={"relative"}
      p={"60px 10px"}
    >
      <Box
      zIndex={1000000}
        p={"5px 12px"}
        bg={"linear-gradient(180deg, #f09c1a 25%, #feff83 100%)"}
        boxShadow={"0 0 10px #ffeb3b"}
        pos={"absolute"}
        right={[5, 10, 10, 10]}
        top={[5, 10, 10, 10]}
        cursor={"pointer"}
        onClick={handleBack}
      >
        <CloseIcon color={"#fff"} fontSize={13} />
      </Box>

      <Flex
        bg={"#f0f8ff91"}
        border={"6px solid rgba(255, 255, 255, 0.9)"}
        w={"fit-content"}
        p={"40px 40px"}
        borderRadius={20}
        margin={"auto"}
        flexDir={"column"}
      >
        <Flex
          zIndex={10}
          margin={"auto"}
          justifyContent={"center"}
          pb={"20px"}
        >
          <Image w={"100px"} h={"100px"} src={logo.src} alt="gift" />
        </Flex>
        <form onSubmit={submitForm}>
          <SimpleGrid
            w={["100%", "100%", "400px", "400px"]}
            spacingX={10}
            spacingY={4}
          >
            <Box>
              <DefaultSelect placeholder={tenancy?.currency || ""} isDisabled />
            </Box>
            <Box>
              <DefaultInput
                placeholder={`${t("username")} *`}
                name={RegistFormEnum.Username}
                value={registForm.userName}
                onChange={formHandler}
              />
              {isError && (
                <Text fontSize={"14px"} color={colors.error}>
                  {errorForm.user}
                </Text>
              )}
            </Box>
            <Box>
              <DefaultInputPassword
                name={RegistFormEnum.Password}
                placeholder={`${t("password")} *`}
                value={registForm.password}
                onFocus={() => setIsPwError(true)}
                onChange={formHandler}
              />
              {isPwError && (
                <Text fontSize={"14px"} color={colors.error}>
                  {errorPw}
                </Text>
              )}
            </Box>
            <DefaultInputPassword
              onFocus={() => setIsPwError(true)}
              placeholder={`${t("confirm_pass")} *`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPass(e.target.value)
              }
            />
            {/* <Box>
                  <DefaultInput name={RegistFormEnum.Email} placeholder={"Email"} value={registForm.emailAddress} onChange={formHandler}/>
                  {isError && <Text fontSize={"14px"} color={colors.error}>{errorForm.email}</Text>}
                </Box> */}
            <Box>
              <DefaultInput
                name={RegistFormEnum.Name}
                placeholder={`${t("same_bank")} *`}
                value={registForm.name}
                onChange={formHandler}
              />
              {isError && (
                <Text fontSize={"14px"} color={colors.error}>
                  {errorForm.name}
                </Text>
              )}
            </Box>
            <Box>
              <InputGroup>
                <InputLeftAddon
                  h={["50px", "50px", "35px", "35px"]}
                  children={"+" + (tenancy?.areaCode || "")}
                />
                <DefaultInput
                  name={RegistFormEnum.Phone}
                  value={registForm.phoneNumber}
                  pattern="[0-9]*"
                  onChange={formHandler}
                  border={`1px solid ${colors.default.input}`}
                  placeholder={`${t("mobile_number")} *`}
                  _focusVisible={{ outline: "none" }}
                />
              </InputGroup>
              {isError && (
                <Text fontSize={"14px"} color={colors.error}>
                  {errorForm.phone}
                </Text>
              )}
            </Box>
            <Checkbox
              _focusVisible={{ outline: "none" }}
              autoFocus={false}
              outline={"none"}
              colorScheme="yellow"
              isChecked={isHaveReferralCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setIsHaveReferralCode(e.target.checked);
                setRegistForm({
                  ...registForm,
                  ReferralCode: "",
                });
              }}
            >
              {t("do_you_have_referral_code")}
            </Checkbox>
            {isHaveReferralCode && (
              <DefaultInput
                placeholder={t("referral_required")}
                name={RegistFormEnum.ReferralCode}
                value={registForm.ReferralCode}
                onChange={formHandler}
              />
            )}
            <Flex flexDirection={"row"}>
              <Text fontSize={"0.9rem"} lineHeight={"22.5px"}>
                {t("age_verification")}{" "}
                <span
                  style={{
                    cursor: "pointer",
                    fontWeight: 700,
                    color: tenancy?.mainColor || colors.primary,
                    fontSize: "0.9rem",
                    lineHeight: "22.5px",
                    textTransform: "uppercase",
                  }}
                  onClick={() => {
                    window.open(
                      `../${PageEnum.Policies}/${PoliciesEnum.Terms}`
                    );
                  }}
                >
                  {t("terms_and_condition")}
                </span>
              </Text>
            </Flex>
            {error && (
              <Text fontSize={"14px"} color={colors.error}>
                {error}
              </Text>
            )}
            <DefaultButton
              isLoading={isLoading}
              textTransform={"uppercase"}
              bg={"linear-gradient(180deg, #f09c1a 25%, #feff83 100%)"}
              boxShadow={"0 0 10px #ffeb3b"}
              type="submit"
              transition={"all .1s ease-in-out"}
              borderRadius={"20px"}
              _hover={{ filter: "brightness(110%)" }}
            >
              {t("join_now")}
            </DefaultButton>
          </SimpleGrid>
        </form>
      </Flex>
    </Box>
  );
};

const uppercaseRegExp = /(?=.*?[A-Z])/;
const restrictSpecialExp = /(?=.*?[#?!@$%^&*-])/;
const lowercaseRegExp = /(?=.*?[a-z])/;
const digitsRegExp = /(?=.*?[0-9])/;
const minMaxLengthRegExp = /.{8,15}/;
export default Signup;

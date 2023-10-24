import { PageEnum } from "@/components/constants/enum";
import { useMemo } from "react";

export const checkCurrentRouter = (router: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const currentPage: any = useMemo(() => {
    const paramsList = router.pathname.split("/");
    switch (true) {
      case paramsList.some((el: any) => el === PageEnum.SignUp):
        return PageEnum.SignUp;
      case paramsList.some((el: any) => el === PageEnum.Withdraw):
        return PageEnum.Withdraw;
      case paramsList.some((el: any) => el === PageEnum.Deposit):
        return PageEnum.Deposit;
      case paramsList.some((el: any) => el === PageEnum.BankAccount):
        return PageEnum.BankAccount;
      case paramsList.some((el: any) => el === PageEnum.Wallet):
        return PageEnum.Wallet;
      case paramsList.some((el: any) => el === PageEnum.Record):
        return PageEnum.Record;
      case paramsList.some((el: any) => el === PageEnum.Profile):
        return PageEnum.Profile;
      case paramsList.some((el: any) => el === PageEnum.More):
        return PageEnum.More;
      case paramsList.some((el: any) => el === PageEnum.Inbox):
        return PageEnum.Inbox;
      case paramsList.some((el: any) => el === PageEnum.Announce):
        return PageEnum.Announce;
      case paramsList.some((el: any) => el === PageEnum.Promo):
        return PageEnum.Promo;
      case paramsList.some((el: any) => el === PageEnum.ChangePass):
        return PageEnum.ChangePass;
      default:
        return PageEnum.Home;
    }
  }, [router]);

  return currentPage;
};

export const checkMainRouter = (router: any) => {
  const paramsList = router.pathname.split("/");
  switch (true) {
    case paramsList.some((el: any) => el === PageEnum.Account):
      return PageEnum.Account;
    case paramsList.some((el: any) => el === PageEnum.Policies):
      return PageEnum.Policies;
    case paramsList.some((el: any) => el === PageEnum.Transaction):
      return PageEnum.Transaction;
    case paramsList.some((el: any) => el === PageEnum.More):
      return PageEnum.More;
    default:
      return PageEnum.Home;
  }
};

export const checkRouterNotDisplayFooter = (router: any) => {
  const paramsList = router.pathname.split("/");
  return paramsList.some(
    (el: any) =>
      el === PageEnum.Account ||
      el === PageEnum.More ||
      el === PageEnum.Transaction
  );
};

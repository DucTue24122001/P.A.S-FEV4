export enum LoginShowEnum {
  LOGIN = "login",
  SIGNUP = "signup",
}

export enum PageEnum {
  SignUp = "signup",
  Home = "home",
  Promo = "promotion",
  Account = "account",
  Withdraw = "withdraw",
  BankAccount = "myBankAccount",
  Deposit = "deposit",
  Wallet = "wallet",
  Record = "records",
  Profile = "profile",
  Inbox = "inbox",
  Announce = "announcement",
  ChangePass = "changePassword",
  Policies = "policies",
  Transaction = "report",
  More = "more",
}

export enum LoginFormEnum {
  Username = "usernameOrEmailAddress",
  Password = "password",
}

export enum RegistFormEnum {
  Username = "userName",
  Password = "password",
  Name = "name",
  Email = "emailAddress",
  Phone = "phoneNumber",
  TenancyName = "dhdemo",
  ReferralCode = "ReferralCode",
}

export enum AddBankEnum {
  Name = "accountName",
  DisplayName = "displayName",
  BankNum = "accountNumber",
}

export enum RecordStatusEnum {
  ACCEPT = "ACCEPTED",
  PENDING = "PENDING",
  REJECT = "REJECTED",
}

export enum RecordFormEnum {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  PROMOTION = "PROMOTION",
}

export enum ChangePwEnum {
  OldPw = "oldPw",
  NewPw = "newPw",
  ConfirmPw = "confirmPw",
}

export enum PoliciesEnum {
  Terms = "terms",
  DisconnectPolicies = "disconnect",
  PrivacyPolicies = "privacy",
}

export enum PromoEnum {
  ALL = "All",
  WELCOME = "WELCOME_BONUS",
  DEPOSIT = "DEPOSIT",
  REWARD = "REWARD",
  REBATE = "REBATE",
}
export enum StatusPromotion {
  NOTACTIVE = "",
  COMPLETED = "COMPLETED",
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
}

export enum PromotionDetailEnum {
  BONUS = "bonus",
  TURNOVER = "turnover",
  MINDEPO = "mindeposit",
  MAXBONUS = "maxbonus",
}
export enum ListCategory {
  HOME = "",
  LIVEARENA = "LIVEARENA",
  LIVE = "LIVE",
  FH = "FH",
  SPORTS = "SPORTS",
  SLOT = "SLOT",
  LOTTERY = "LOTTERY",
  ARCADE = "ARCADE",
  RNGTABLE = "RNGTABLE",
}
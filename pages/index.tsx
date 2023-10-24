import React, { useEffect, useState } from "react";
import GameHotHome from "@/components/Home/GameHotHome";
import Category from "@/components/layout/Navbar/Category";
import Slide from "@/components/layout/Navbar/Slide";
import Marque from "@/components/layout/Navbar/Marque";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import GameType from "@/components/Home/GameType/GameType";
import { ListCategory } from "@/components/constants/enum";

export default function Home() {
  const { categoryData }: any = useSelector(
    (state: RootState) => state.account
  );
  const { gameType }: any = useSelector((state: RootState) => state.client);
  const checkCategory = () => {
    switch (gameType) {
      case ListCategory.HOME:
        return false;
      case ListCategory.LIVEARENA:
        return true;
      case ListCategory.LIVE:
        return true;
      case ListCategory.SPORTS:
        return true;
      case ListCategory.SLOT:
        return true;
      case ListCategory.FH:
        return true;
      case ListCategory.ARCADE:
        return true;
      case ListCategory.LOTTERY:
        return true;
      case ListCategory.RNGTABLE:
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <Category />
      <Slide />
      <Marque />
      {checkCategory() !== true ? <GameHotHome /> : <GameType />}
    </>
  );
}

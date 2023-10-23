import React from "react";
import GameHotHome from "@/components/Home/GameHotHome";
import Category from "@/components/layout/Navbar/Category";
import Slide from "@/components/layout/Navbar/Slide";
import Marque from "@/components/layout/Navbar/Marque";

export default function Home() {
  return (
    <>
      <Category />
      <Slide />
      <Marque />
      <GameHotHome />
    </>
  );
}

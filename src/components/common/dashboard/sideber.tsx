"use client";
import React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { navItems } from "./nav-data";
import FavIcon from "@/icon/favIcon";
import { usePathname } from "next/navigation";
import Navitem from "./nav-item";

export default function Sideber() {
  return (
    <div className="flex fixed left-0 top-0 z-60">
      {/* Sidebar */}
      <aside
        className={`w-20 h-screen overflow-y-scroll scrollbar-hide border-r border-white/10  bg-sideber blur-bg backdrop-blur-2xl`}
      >
        <div className="flex flex-col h-full relative">
          <div className="flex items-center justify-center mt-4 mb-8  rounded-md">
            <Image src={logo} alt="img" width={40} height={20} />
          </div>
          <Navitem items={navItems} />
          <div className="absolute cursor-pointer bottom-8 left-1/2 -translate-x-1/2 w-max">
            <FavIcon name="logout" />
          </div>
        </div>
      </aside>
    </div>
  );
}

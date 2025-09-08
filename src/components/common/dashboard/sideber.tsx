"use client";
import React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { navItems } from "./nav-data";
import FavIcon from "@/icon/favIcon";
import Navitem from "./nav-item";

export default function Sideber() {
  return (
    <div className="flex fixed left-0 top-0 z-60">
      {/* Sidebar */}
      <aside
        className={`w-20 overflow-y-scroll scrollbar-hide border-r border-white/10  bg-sideber blur-bg backdrop-blur-2xl`}
      >
        <div className="flex flex-col relative">
          <div className="flex items-center justify-center h-[120px]  rounded-md">
            <span className="relative mb-6"> <Image src={logo} alt="img" width={40} height={20} /></span>
          </div>
          <div className="flex flex-col pb-10 justify-between overflow-y-scroll scrollbar-hide h-[calc(100vh-120px)]">
            <Navitem items={navItems} />
            <div className="w-max mt-8 mx-auto">
              <FavIcon name="logout" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

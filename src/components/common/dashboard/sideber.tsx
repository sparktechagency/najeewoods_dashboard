"use client";
import React from "react";
import logo from "@/assets/logo.svg";
import { navItems } from "./nav-data";
import FavIcon from "@/icon/favIcon";
import Navitem from "./nav-item";
import { Button } from "@/components/ui";

export default function Sideber({sidebarOpen, setSidebarOpen}:any) {
  return (
    <div className="block">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 opacity-50"
          onClick={() => {
            setSidebarOpen(false);
          }}
        />
      )}
      <aside
        className={`w-[245px] md:w-20 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform transform duration-300 ease-linear overflow-y-scroll h-screen fixed left-0 top-0 z-60 scrollbar-hide border-r border-white/10  bg-sideber blur-bg backdrop-blur-2xl`}
      >
        <div className="flex flex-col relative">
          <div className="flex items-center justify-center h-[120px]  rounded-md">
            <span className="relative mb-3">
              <picture>
                <img src={logo.src} alt="Logo" className="p-3" />
              </picture>
            </span>
          </div>
          <div className="flex flex-col pb-10  justify-between overflow-y-scroll scrollbar-hide h-[calc(100vh-120px)]">
            <Navitem items={navItems} />
            <Button className="bg-figma-primary cursor-pointer hover:bg-figma-primary  w-fit mx-auto md:bg-transparent md:hover:bg-transparent">
              {" "}
              <FavIcon className="size-4 md:size-6" name="logout" />{" "}
              <span className="block md:hidden">Logout</span>
            </Button>
          </div>
        </div>
      </aside>
    </div>
    // <div className="flex fixed left-0 top-0 z-60">
    //   {/* Sidebar */}
    //   <aside
    //     className={`w-20 overflow-y-scroll scrollbar-hide border-r border-white/10  bg-sideber blur-bg backdrop-blur-2xl`}
    //   >
    //     <div className="flex flex-col relative">
    //       <div className="flex items-center justify-center h-[120px]  rounded-md">
    //         <span className="relative mb-6"> <Image src={logo} alt="img" width={40} height={20} /></span>
    //       </div>
    //       <div className="flex flex-col pb-10 justify-between overflow-y-scroll scrollbar-hide h-[calc(100vh-120px)]">
    //         <Navitem items={navItems} />
    //         <div className="w-max mt-8 mx-auto">
    //           <FavIcon name="logout" />
    //         </div>
    //       </div>
    //     </div>
    //   </aside>
    // </div>
  );
}

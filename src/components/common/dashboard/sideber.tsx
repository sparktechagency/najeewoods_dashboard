import { Button } from "@/components/ui";
import React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";

export default function Sideber() {
  return (
    <div className="flex fixed left-0 top-0 z-60">
      {/* Sidebar */}
      <aside className={`w-20 h-screen border-r border-white/10  bg-sideber blur-bg backdrop-blur-2xl`}>
        <div className="flex flex-col h-full relative">
          <div className="flex items-center justify-center  rounded-md">
            <Image src={logo} alt="img" width={50} height={20} />
          </div>
          <nav>{/* <NavItem item={links} /> */}</nav>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-max">
            <Button className="text-red-500 bg-white rounded-sm">Out</Button>
          </div>
        </div>
      </aside>
    </div>
  );
}

"use client";
import Navber from "@/components/common/dashboard/navber";
import Sideber from "@/components/common/dashboard/sideber";
import { childrenProps } from "@/types";
import React from "react";

export default function CommonLayout({ children }: childrenProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* <!-- ===== Sidebar Start ===== --> */}
      <Sideber />
      {/* <!-- ===== Content Area Start ===== --> */}
      <div className="relative flex  flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Navber />
        <div className="p-5 ml-[80px]">{children}</div>
      </div>
    </div>
  );
}

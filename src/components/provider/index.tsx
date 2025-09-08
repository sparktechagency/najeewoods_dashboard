"use client";
import { childrenProps } from "@/types";
import React from "react";
import SearchProvider from "../common/search-box";
import { ConfirmDialogProvider } from "../context/delete-modal";
import { Toaster } from "sonner";

export default function Provider({ children }: childrenProps) {
  return (
    <ConfirmDialogProvider>
      <SearchProvider>{children}</SearchProvider>
      <Toaster richColors position="top-right" />
    </ConfirmDialogProvider>
  );
}

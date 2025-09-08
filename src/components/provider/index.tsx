"use client";
import { childrenProps } from "@/types";
import React from "react";
import { ConfirmDialogProvider } from "../context/delete-modal";
import { Toaster } from "sonner";

export default function Provider({ children }: childrenProps) {
  return (
    <ConfirmDialogProvider>
      {children}
      <Toaster richColors position="top-right" />
    </ConfirmDialogProvider>
  );
}

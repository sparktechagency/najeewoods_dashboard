"use client";
import { childrenProps } from "@/types";
import React from "react";
import { ConfirmDialogProvider } from "../context/delete-modal";
import { Toaster } from "sonner";

export default function Provider({ children }: childrenProps) {
  return (
    <ConfirmDialogProvider>
      {children}
      <Toaster
        toastOptions={{
          style: {
            background: "rgba(29, 29, 29, 0.20)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "white",
            backdropFilter: "blur(48px)",
          },
          classNames: {
            description: "!text-white",
            icon: "!text-green-300",
          },
        }}
        position="top-right"
      />
    </ConfirmDialogProvider>
  );
}

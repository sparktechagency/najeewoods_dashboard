"use client";
import Form from "@/components/reuseble/from";
import { FromInput } from "@/components/reuseble/from-input";
import {newPasswordSchema } from "@/components/schema";
import { Button } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import React from "react";
import bgImg from "@/assets/bg2.png";
import Image from "next/image";
import { BackBtn2 } from "@/components/reuseble/back-btn";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewPassword() {
  const router = useRouter();
  const from = useForm({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    toast.success("Password updated successfully", {
        description: "Please login with your new password."
    });
    console.log(values)
    router.push('/');
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="w-11/12 relative lg:w-fit lg:min-w-lg z-50  xl:min-w-xl px-10  py-20 rounded-xl border">
        <Image
          src={bgImg}
          alt="title"
          fill
          className="object-cover z-[-1] rounded-md"
        />
        <div className="z-10 absolute top-3 left-3">
          <BackBtn2 />
        </div>
        <div className="z-10">
          <h1 className="text-center text-2xl font-medium">
           Set a new password
          </h1>
          <h1 className="text-center max-w-xs mx-auto text-secondery-figma">
            Create a new password. Ensure that its different from previous one.
          </h1>
          <div className="pt-20">
            <Form
              from={from}
              className="space-y-7"
              onSubmit={handleSubmit}
            >
              <FromInput
                name="password"
                label="Password"
                placeholder="Enter your password"
                stylelabel="bg-background"
                type="password"
              />
              <FromInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Enter your confirm password"
                stylelabel="bg-background"
                type="password"
              />

              <div className="flex justify-center">
                <Button size={"lg"} className="!px-10" variant={"primary"}>Update password</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

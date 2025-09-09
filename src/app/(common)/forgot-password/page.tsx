"use client";
import Form from "@/components/reuseble/from";
import { FromInput } from "@/components/reuseble/from-input";
import { loginSchema } from "@/components/schema";
import { Button } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import React from "react";
import bgImg from "@/assets/bg2.png";
import Image from "next/image";
import { BackBtn2 } from "@/components/reuseble/back-btn";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const from = useForm({
    resolver: zodResolver(loginSchema.partial()),
    defaultValues: {
      email: "",
    },
  });

  const handlePasswordSubmit = async (values: FieldValues) => {
    console.log(values.email);
    router.push(`/verify-otp?email=${values.email}`);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="w-11/12 relative lg:w-fit lg:min-w-lg z-50  xl:min-w-xl px-10 py-20 lg:py-30 rounded-xl border">
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
            Forgot password ?
          </h1>
          <h1 className="text-center text-secondery-figma">
            Please inter your registered email
          </h1>
          <div className="pt-20">
            <Form
              from={from}
              className="space-y-7"
              onSubmit={handlePasswordSubmit}
            >
              <FromInput
                name="email"
                label="Email"
                placeholder="Enter your email"
                stylelabel="bg-background"
                type="email"
              />

              <div className="flex justify-center">
                <Button size={"lg"} className="!px-10" variant={"primary"}>
                  Send code
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

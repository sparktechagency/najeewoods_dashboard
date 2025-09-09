"use client";
import Form from "@/components/reuseble/from";
import { FromInput } from "@/components/reuseble/from-input";
import { loginSchema } from "@/components/schema";
import { Button, Checkbox, Label } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";
import bgImg from "@/assets/bg.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RootPage() {
    const router = useRouter();
  const from = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    toast.success("Login Successfully", {
      description: "You have successfully logged in",
    });
    router.push("/dashboard");
    console.log(values);
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
        <div className="z-10">
          <h1 className="text-center text-2xl font-medium">
            Login to your account
          </h1>
          <h1 className="text-center text-secondery-figma">
            Please enter your email & password to continue
          </h1>
          <div className="pt-20">
            <Form
              from={from}
              className="space-y-7"
              onSubmit={handleSubmit}
            >
              <FromInput
                name="email"
                label="Email"
                placeholder="Enter your email"
                stylelabel="bg-background"
                type="email"
              />
              <div>
                <FromInput
                  eye={true}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  stylelabel="bg-background"
                />
                <div className="flex items-center mt-3 justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox className="" id="remember-me" />
                    <Label htmlFor="remember-me">Remember me</Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-[#EC7C5C] font-semibold hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div className="flex justify-center">
                <Button size={"lg"} className="!px-10" variant={"primary"}>Sign In</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

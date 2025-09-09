"use client";
import ShadowBox from "@/components/common/shadow-box";
import WapperBox from "@/components/reuseble/wapper-box";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Form from "@/components/reuseble/from";
import { FieldValues, useForm } from "react-hook-form";
import { FromInput } from "@/components/reuseble/from-input";
import { PlaceholderImg } from "@/lib";
import FavIcon from "@/icon/favIcon";
import Image from "next/image";
import ImgUpload from "@/components/reuseble/img-upload";
import { Button } from "@/components/ui";
import PasswordChange from "@/components/common/password-change";
import { toast } from "sonner";

const intAva = {
  file: null,
  preview: null,
};

function ProfileChild() {
  const params = useSearchParams();
  const tab = params.get("tab") || "overview";
  const [isTab, setIsTab] = useState(tab === "password" ? "tab-2" : "tab-1");
  const [avatar, setAvatar] = useState<any>(intAva);

  useEffect(() => {
    setIsTab(tab === "password" ? "tab-2" : "tab-1");
  }, [tab]);

  const profilefrom = useForm({
    // resolver: zodResolver(podcastSchema),
    defaultValues: {
      name: "julfiker",
      email: "julfiker@gmail.com",
    },
  });
  const handleProfileSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(avatar?.file && { image: avatar?.file }),
    };
    toast.success("Profile Updated", {
      description: "Your profile has been successfully updated",
      position: "bottom-right",
    });
    console.log(value);
  };

  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h1 className="text-2xl font-semibold">
              {isTab === "tab-1" ? "Admin profile" : "Change password"}
            </h1>
            <h1 className="text-base">Last updated 6 days ago</h1>
          </div>
        </div>
      </ShadowBox>
      <WapperBox>
        <div className="flex items-center space-x-5 border-b-2 my-4">
          {["Overview", "Change password"].map((item, index) => {
            const tabId = `tab-${index + 1}`;
            return (
              <div
                key={item}
                onClick={() => setIsTab(tabId)}
                className="cursor-pointer font-medium text-lg"
              >
                <span className="px-6">{item}</span>
                <div
                  className={`w-full h-1 rounded-t-md ${
                    isTab === tabId ? "bgOne" : "bg-transparent"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="mx-auto lg:max-w-xl">
          {isTab == "tab-1" ? (
            <Form
              from={profilefrom}
              className="space-y-6"
              onSubmit={handleProfileSubmit}
            >
              <div className="relative mx-auto size-28 rounded-full">
                <Image
                  src={avatar?.preview || PlaceholderImg() || "/blur.png"}
                  alt={"title"}
                  fill
                  className={"object-cover rounded-full"}
                />
                <ImgUpload
                  className="grid place-items-center shadow-md  rounded-full absolute -bottom-1 -right-2 cursor-pointer"
                  onFileSelect={(file: File) => {
                    setAvatar({
                      ...avatar,
                      file,
                      preview: URL.createObjectURL(file),
                    });
                  }}
                >
                  <FavIcon className="p-1" name="profileUpload" />
                </ImgUpload>
              </div>

              <FromInput name="name" label="Name" stylelabel="bg-background" />
              <FromInput
                name="email"
                label="Email"
                stylelabel="bg-background"
              />
              <div className="flex justify-center">
                <Button variant={"primary"}>
                  <FavIcon name="save" />
                  Save Change
                </Button>
              </div>
            </Form>
          ) : (
            <PasswordChange />
          )}
        </div>
      </WapperBox>
    </div>
  );
}

export default function ProfileParent() {
  return (
    <Suspense>
      <ProfileChild />
    </Suspense>
  );
}

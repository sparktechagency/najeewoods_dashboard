"use client";
import ShadowBox from "@/components/common/shadow-box";
import { BackBtn } from "@/components/reuseble/back-btn";
import { ImgBox } from "@/components/reuseble/img-box";
import WapperBox from "@/components/reuseble/wapper-box";
import { ArrowUp } from "lucide-react";
import photo1 from "@/assets/unuse/photo1.jpg";
import FavIcon from "@/icon/favIcon";
import { useState } from "react";
import Avatars from "@/components/reuseble/avater";
import ModalOne from "@/components/reuseble/modal-one";
import { PlaceholderImg } from "@/lib";
import img1 from "@/assets/unuse/img1.jpg";
import LikeToggle from "@/components/reuseble/like-toggle";
import useConfirmation from "@/components/context/delete-modal";

export default function VidePost() {
    const { confirm } = useConfirmation();
  const [isPreview, setIsPreview] = useState(false);


 
    const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this vibe",
      subTitle: "Delete Vibe",
      description: "After deleting, users wont be able to find this vibe in your app",
    });
    if (con) {
      console.log(id);
    }
  };

  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div className="flex gap-2">
            <BackBtn />
            <div>
              <h1 className="text-2xl font-semibold">
                Elizabeth Olson&apos;s vibes
              </h1>
              <h1 className="text-base">20 vibes posted</h1>
            </div>
          </div>
          <h1 className="flex gap-2 mt-2 lg:mt-0">
            <span className="flex space-x-2 items-center text-green-figma">
              <ArrowUp className="size-5 text-green-figma" /> 20%
            </span>
            Increased from previous month
          </h1>
        </div>
      </ShadowBox>
      <WapperBox>
        <div className="pt-4 flex gap-6 lg:gap-4  2xl:gap-6 flex-wrap">
          {Array.from({ length: 10 }).map((item, index) => {
            return (
              <div
                className="cursor-pointer"
                key={index}
                onClick={() => setIsPreview(!isPreview)}
              >
                <ImgBox src={photo1} alt="ff" className="h-[200px] w-[200px]">
                  <div className="absolute bottom-3 left-3 text-lg font-medium flex gap-x-2 items-center">
                    <FavIcon name="like" /> 120
                  </div>
                </ImgBox>
              </div>
            );
          })}
        </div>
      </WapperBox>
      {/* modal custom */}
      <ModalOne
        open={isPreview}
        setIsOpen={setIsPreview}
        className="sm:max-w-xs"
        headerStyle="pt-4 px-4 pb-0"
        profile={
          <>
            <Avatars
              src={PlaceholderImg()}
              fallback={"E"}
              alt="profile"
              fallbackStyle="bg-[#cb4ec9]/70 text-white"
            />
            <div className="leading-5">
              <h1 className="flex font-medium items-center">
                Elizabeth Olson{" "}
                <FavIcon className="ml-2 size-4" name="internet" />
              </h1>
              <h1 className="text-secondery-figma">😥Mental</h1>
            </div>
          </>
        }
      >
        <ImgBox src={img1} className="w-full h-[300px]" alt="img"></ImgBox>
        <div className="mt-4 flex justify-between items-center">
          <LikeToggle />
          <div
            onClick={() => handleDelete("123")}
            className="border cursor-pointer size-10  grid place-items-center rounded-md"
          >
            <FavIcon name="delete" className="size-5" />
          </div>
        </div>
      </ModalOne>
    </div>
  );
}

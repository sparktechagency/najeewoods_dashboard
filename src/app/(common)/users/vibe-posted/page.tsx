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

export default function VidePost() {
  const [isPreview, setIsPreview] = useState(false);
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
              <h1 className="text-xl">20 vibes posted</h1>
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
        <div className="pt-4 flex  gap-5 flex-wrap">
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
        profile={
          <>
            <Avatars
              src={""}
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
        <h1>fjdlf</h1>
      </ModalOne>
      {/* <Dialog1 open={isPreview} onOpenChange={setIsPreview}>
        <DialogTrigger1 asChild />
        <DialogContent1
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className="sm:max-w-md p-0 gap-0 bg-blacks rounded-2xl overflow-hidden border-none"
        >
          <DialogHeader1 className=" text-white p-4">
             <div className="flex items-center space-x-2">
              
            </div>
            <DialogTitle1 className={"text-white hidden font-medium"}>
            </DialogTitle1>
          </DialogHeader1>
          <div className="p-4">main</div>
        </DialogContent1>
      </Dialog1> */}
    </div>
  );
}

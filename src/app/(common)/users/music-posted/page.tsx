"use client";
import ShadowBox from "@/components/common/shadow-box";
import { BackBtn } from "@/components/reuseble/back-btn";
import WapperBox from "@/components/reuseble/wapper-box";
import { ArrowUp } from "lucide-react";
import FavIcon from "@/icon/favIcon";
import { useState } from "react";
import Avatars from "@/components/reuseble/avater";
import ModalOne from "@/components/reuseble/modal-one";
import { PlaceholderImg } from "@/lib";
import LikeToggle from "@/components/reuseble/like-toggle";
import useConfirmation from "@/components/context/delete-modal";
import MusicPlayer from "@/components/common/music-player";

export default function MusicPosted() {
  const { confirm } = useConfirmation();
  const [isPreview, setIsPreview] = useState(false);

  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this music",
      subTitle: "Delete Music",
      description:
        "After deleting, users wont be able to find this music in your app",
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
                Elizabeth Olson&apos;s music&apos;s
              </h1>
              <h1 className="text-base">20 music posted</h1>
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
                className="cursor-pointer h-[190px] w-[200px] bg-card-figma rounded-md p-5 flex flex-col justify-between"
                key={index}
                onClick={() => setIsPreview(!isPreview)}
              >
                <h1 className="flex justify-center">
                  <FavIcon name="musicBers" />
                </h1>
                <h1 className="text-center text-secondery-figma text-lg font-medium">
                  0:50
                </h1>
                <h1 className="bg-[#F7F7F7] w-full h-px"></h1>
                <div className="flex items-center justify-between">
                  <span className="font-medium flex items-center">
                    {" "}
                    <FavIcon name="like" className="mr-1" /> 120
                  </span>
                  <span>
                    <FavIcon name="play" />
                  </span>
                </div>
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
        <div className="space-y-3">
            <MusicPlayer/>
        <p className="text-[#FFF]">
          Lorem ipsum dolor sit amet consectetur. Semper vel phasellus commodo
          neque. Duis turpis nascetur tincidunt egestas laoreet elementum
          bibendum.
        </p>
        <div className="mt-4 flex justify-between items-center">
          <LikeToggle />
          <div
            onClick={() => handleDelete("123")}
            className="border cursor-pointer size-10  grid place-items-center rounded-md"
          >
            <FavIcon name="delete" className="size-5" />
          </div>
        </div>
        </div>
      </ModalOne>
    </div>
  );
}

"use client";
import ShadowBox from "@/components/common/shadow-box";
import WapperBox from "@/components/reuseble/wapper-box";
import { ImgBox } from "@/components/reuseble/img-box";
import Avatars from "@/components/reuseble/avater";
import { useGetPostQuery } from "@/redux/api/commonApi";
import { NoItemData } from "@/components/reuseble/table-no-item";
import RepeatCount from "@/components/reuseble/repeat-count/count";
import { Pagination } from "@/components/reuseble/pagination";
import { Skeleton } from "@/components/ui";
import { useState } from "react";
import { helpers, userVisibiliy } from "@/lib";
import Image from "next/image";

export default function Vibes() {
  const [isPage, setIsPage] = useState(1);
  const { data: vibes, isLoading } = useGetPostQuery({
    post_type: "vibes",
    page: isPage,
  });

  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h1 className="text-2xl font-semibold">Vibes</h1>
            <h1 className="text-base">
              Total Vibes: {vibes?.meta?.total || 0}
            </h1>
          </div>
        </div>
      </ShadowBox>
      <WapperBox>
        <div className="pt-4 flex gap-6 lg:gap-4  2xl:gap-6 flex-wrap">
          {isLoading ? (
            <RepeatCount count={20}>
              <Skeleton className="w-[200px]  h-[180px]" />
            </RepeatCount>
          ) : vibes?.data?.length > 0 ? (
            vibes?.data?.map((item: any, index: any) => (
              <ImgBox
                src={helpers.imgSource(item?.image[0]) || ""}
                alt="img"
                key={index}
                className="h-[190px] w-[200px] rounded-xl"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%)",
                  }}
                ></div>
                <div>
                  <div className="*:text-white flex items-center space-x-1 z-50 absolute left-1/2 -translate-x-1/2 bottom-3">
                    <Avatars
                      src={helpers.imgSource(item?.user?.avatar) || ""}
                      fallback={item?.user?.name || "N"}
                      alt="profile"
                      fallbackStyle="bg-[#cb4ec9]/70 text-white"
                    />
                    <div className="leading-5 w-max">
                      <h1 className="flex font-medium items-center">
                        {item?.user?.name || "N/A"}
                        <span className="ml-1">
                          {userVisibiliy[item.privacy] || " public"}
                        </span>
                      </h1>
                      <h1 className="text-secondery-figma flex  items-center">
                        <Image
                          src={
                            helpers.imgSource(item?.mood?.icon) || "/vide.png"
                          }
                          width={20}
                          height={20}
                          alt="img"
                        />
                        <span className="ml-1">
                          {item?.mood?.name || "N/A"}
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
              </ImgBox>
            ))
          ) : (
            <NoItemData className="w-full" title="No mood data available" />
          )}
        </div>
        <ul className="flex flex-wrap justify-end my-7">
          <li className="font-medium">
            <Pagination
              onPageChange={(v: any) => setIsPage(v)}
              {...vibes?.meta}
            ></Pagination>
          </li>
        </ul>
      </WapperBox>
    </div>
  );
}

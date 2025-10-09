"use client";
import ShadowBox from "@/components/common/shadow-box";
import useConfirmation from "@/components/context/delete-modal";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reuseble/avater";
import { Deletebtn, Previewbtn } from "@/components/reuseble/icon-list";
import Modal from "@/components/reuseble/modal";
import { Pagination } from "@/components/reuseble/pagination";
import { CustomTable } from "@/components/reuseble/table";
import { TableNoItem } from "@/components/reuseble/table-no-item";
import { TableSkeleton } from "@/components/reuseble/table-skeleton";
import WapperBox from "@/components/reuseble/wapper-box";
import { TableCell, TableRow } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { useGetUserQuery } from "@/redux/api/userApi";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const data1 = [
  {
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    vibes: 50,
    music: 36,
    podcast: 20,
    followers: 1500,
  },
  {
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    vibes: 50,
    music: 36,
    podcast: 20,
    followers: 1500,
  },
  {
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    vibes: 50,
    music: 36,
    podcast: 20,
    followers: 1500,
  },
  {
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    vibes: 50,
    music: 36,
    podcast: 20,
    followers: 1500,
  },
  {
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    vibes: 50,
    music: 36,
    podcast: 20,
    followers: 1500,
  },
  {
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    vibes: 50,
    music: 36,
    podcast: 20,
    followers: 1500,
  },
  {
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    vibes: 50,
    music: 36,
    podcast: 20,
    followers: 1500,
  },
  {
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    vibes: 50,
    music: 36,
    podcast: 20,
    followers: 1500,
  },
  {
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    vibes: 50,
    music: 36,
    podcast: 20,
    followers: 1500,
  },
  {
    name: "Elizabeth Olson",
    email: "example@gmail.com",
    vibes: 50,
    music: 36,
    podcast: 20,
    followers: 1500,
  },
];

export default function Users() {
  const [isPreview, setIsPreview] = useState(false);
  const { confirm } = useConfirmation();
  const [isPage, setIsPage] = useState(1);
  const [value] = useDebounce("", 1000);
  const headers = [
    "Name",
    "Email",
    "Vibes",
    "Music",
    "Podcast",
    "Followers",
    "Action",
  ];
  const { data, isLoading } = useGetUserQuery({});
  console.log(data);

  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this user",
      subTitle: "Delete User",
      description: "After deleting, this user wont be able to use your app ",
    });
    if (con) {
      console.log(id);
    }
  };

  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h1 className="text-2xl font-semibold">Users</h1>
            <h1 className="text-xl">Total users: 1200</h1>
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
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
          ) : data1?.length > 0 ? (
            data1?.map((item, index) => (
              <TableRow key={index} className="border">
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={""}
                      fallback={item.name}
                      alt="profile"
                      fallbackStyle="bg-[#cb4ec9]/70 text-white"
                    />
                    <span>{item.name}</span>
                  </div>
                </TableCell>

                <TableCell>{item.email}</TableCell>
                <TableCell>{item.vibes}</TableCell>
                <TableCell>{item.music}</TableCell>
                <TableCell>{item.podcast}</TableCell>
                <TableCell>{item.followers}</TableCell>

                <TableCell>
                  <ul className="flex gap-2">
                    <li>
                      <Previewbtn onClick={() => setIsPreview(!isPreview)} />
                    </li>
                    <li>
                      <Deletebtn onClick={() => handleDelete(item.name)} />
                    </li>
                  </ul>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No users are available at the moment"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </WapperBox>
      <ul className="flex flex-wrap justify-end my-7">
        <li className="font-medium">
          <Pagination
            onPageChange={(v: any) => setIsPage(v)}
            {...dummyJson.meta}
          ></Pagination>
        </li>
      </ul>
      {/* preview */}
      <Modal
        open={isPreview}
        setIsOpen={setIsPreview}
        title="User Details"
        titleStyle="text-center"
        className="sm:max-w-2xl"
      >
        <div className="p-1 space-y-3">
          <div className="border flex justify-between rounded-lg p-2">
            <div className="flex items-center space-x-2">
              <Avatars
                src={""}
                fallback={"T"}
                alt="profile"
                fallbackStyle="bg-[#cb4ec9]/70 text-white"
              />
              <div className="leading-5">
                <h1>Elizabeth Olson</h1>
                <h1 className="text-secondery-figma">example@gmail.com</h1>
              </div>
            </div>
            <div
              onClick={() => handleDelete("55")}
              className="border cursor-pointer size-10  grid place-items-center rounded-md"
            >
              <FavIcon name="delete" className="size-5" />
            </div>
          </div>
          <h1 className="text-2xl font-medium">Bio</h1>
          <div className="border p-3 rounded-md text-[#FFF]">
            Lorem ipsum dolor sit amet consectetur. Nulla erat nisl cursus
            morbi. Vitae eu non et urna hendrerit nullam mattis. Facilisis
            consectetur bibendum mattis sed scelerisque. Quam lectus velit magna
            lacus volutpat at lacus lacus phasellus. Eu nibh aliquet lacus
            bibendum fusce massa purus luctus. Augue tortor pretium molestie
            faucibus diam habitant neque lacus. Lectus et habitant velit semper
            sed egestas suspendisse condimentum. Viverra adipiscing risus vel
            turpis turpis egestas feugiat eget non. Faucibus adipiscing enim nec
            leo morbi.
          </div>
          <div className="space-y-3 pt-2">
            <DetailsNav
              href="/dashboard/users/vibe-posted"
              icon={<FavIcon name="vibePost" className="size-5" />}
              text="Vibe posted"
              value={50}
            />
            <DetailsNav
              href="/dashboard/users/music-posted"
              icon={<FavIcon name="music" className="size-5" />}
              text="Music posted"
              value={36}
            />
            <DetailsNav
              href="/dashboard/users/podcast-posted"
              icon={<FavIcon name="padcostDetails" className="size-5" />}
              text="Podcast posted"
              value={10}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

// DetailsNav
function DetailsNav({ href, icon, text, value }: any) {
  return (
    <div className="flex justify-between space-x-3 h-11">
      <Link
        href={href}
        className="w-full flex justify-between items-center border rounded-xl px-3"
      >
        <span className="flex gap-x-2 items-center">
          {icon} {text}:
        </span>
        <span>{value}</span>
      </Link>
      <Link
        href={href}
        className="h-11 w-12 bgOne rounded-xl grid place-items-center cursor-pointer"
      >
        <ArrowUpRight />
      </Link>
    </div>
  );
}

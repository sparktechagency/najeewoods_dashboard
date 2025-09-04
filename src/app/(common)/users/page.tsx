"use client";
import { useSearch } from "@/components/common/search-box";
import ShadowBox from "@/components/common/shadow-box";
import useConfirmation from "@/components/context/delete-modal";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reuseble/avater";
import { Deletebtn, Previewbtn } from "@/components/reuseble/icon-list";
import { Pagination } from "@/components/reuseble/pagination";
import { CustomTable } from "@/components/reuseble/table";
import { TableNoItem } from "@/components/reuseble/table-no-item";
import { TableSkeleton } from "@/components/reuseble/table-skeleton";
import WapperBox from "@/components/reuseble/wapper-box";
import { TableCell, TableRow } from "@/components/ui";
import { ArrowUp } from "lucide-react";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

const data = [
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
  const { confirm } = useConfirmation();
  const { searchText, setSearchText } = useSearch();
  const [isPage, setIsPage] = useState(1);
  const [value] = useDebounce(searchText, 1000);
  const headers = [
    "Name",
    "Email",
    "Vibes",
    "Music",
    "Podcast",
    "Followers",
    "Action",
  ];
  const isLoading = false;

  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this user",
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
          ) : data?.length > 0 ? (
            data?.map((item, index) => (
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
                      <Previewbtn />
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
    </div>
  );
}

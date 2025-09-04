import ShadowBox from "@/components/common/shadow-box";
import Avatars from "@/components/reuseble/avater";
import { CustomTable } from "@/components/reuseble/table";
import { TableNoItem } from "@/components/reuseble/table-no-item";
import { TableSkeleton } from "@/components/reuseble/table-skeleton";
import { TableCell, TableRow } from "@/components/ui";
import { ArrowUp } from "lucide-react";
import React from "react";

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
];

export default function Users() {
  const headers = ["Name", "Email", "Vibes", "Music", "Podcast", "Followers", "Action"];
  const isLoading = false;
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
      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton
              colSpan={headers?.length}
              tdStyle="!pl-0 !bg-background"
            />
          ) : data?.length > 0 ? (
            data?.map((item, index) => (
              <TableRow key={index}>
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
                      <button className="p-2 bg-blue-100 rounded-md">View</button>
                    </li>
                    <li>
                      <button className="p-2 bg-red-100 rounded-md">Delete</button>
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
      </div>
    </div>
  );
}

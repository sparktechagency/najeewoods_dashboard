"use client";
import { useSearch } from "@/components/common/search-box";
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
import { Button, TableCell, TableRow } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { use, useState } from "react";
import { useDebounce } from "use-debounce";

const subscribersitem = [
  {
    name: "Elizabeth Olson",
    subscriber_type: "Vibes creator pro",
    starting_date: "17 Jul, 2025",
    ending_date: "16 Aug, 2025",
  },
  {
    name: "John Doe",
    subscriber_type: "Vibes creator pro",
    starting_date: "18 Jul, 2025",
    ending_date: "17 Aug, 2025",
  },
  {
    name: "Emma Watson",
    subscriber_type: "Vibes creator pro",
    starting_date: "19 Jul, 2025",
    ending_date: "18 Aug, 2025",
  },
  {
    name: "Chris Hemsworth",
    subscriber_type: "Vibes creator pro",
    starting_date: "20 Jul, 2025",
    ending_date: "19 Aug, 2025",
  },
  {
    name: "Scarlett Johansson",
    subscriber_type: "Vibes creator pro",
    starting_date: "21 Jul, 2025",
    ending_date: "20 Aug, 2025",
  },
  {
    name: "Robert Downey Jr.",
    subscriber_type: "Vibes creator pro",
    starting_date: "22 Jul, 2025",
    ending_date: "21 Aug, 2025",
  },
  {
    name: "Mark Ruffalo",
    subscriber_type: "Vibes creator pro",
    starting_date: "23 Jul, 2025",
    ending_date: "22 Aug, 2025",
  },
  {
    name: "Tom Hiddleston",
    subscriber_type: "Vibes creator pro",
    starting_date: "24 Jul, 2025",
    ending_date: "23 Aug, 2025",
  },
  {
    name: "Benedict Cumberbatch",
    subscriber_type: "Vibes creator pro",
    starting_date: "25 Jul, 2025",
    ending_date: "24 Aug, 2025",
  },
  {
    name: "Chadwick Boseman",
    subscriber_type: "Vibes creator pro",
    starting_date: "26 Jul, 2025",
    ending_date: "25 Aug, 2025",
  },
  {
    name: "Tom Holland",
    subscriber_type: "Vibes creator pro",
    starting_date: "27 Jul, 2025",
    ending_date: "26 Aug, 2025",
  },
  {
    name: "Zendaya",
    subscriber_type: "Vibes creator pro",
    starting_date: "28 Jul, 2025",
    ending_date: "27 Aug, 2025",
  },
];

export default function Subscribers() {
  const [isPreview, setIsPreview] = useState(false);
  const [subscriberToggle, setSubscriberToggle] = useState<any>();
  const [isUser, setIsUser] = useState(false);
  const { confirm } = useConfirmation();
  const { searchText, setSearchText } = useSearch();
  const [isPage, setIsPage] = useState(1);
  const [value] = useDebounce(searchText, 1000);
  const headers = [
    "Name",
    "Subscriber type",
    "Starting date",
    "Ending date",
    "Action",
  ];
  const isLoading = false;

  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this subscriber",
      subTitle: "Delete subscriber",
      description:
        "After deleting, users wont be able to find this subscriber in your app",
    });
    if (con) {
      console.log(id);
    }
  };

  // handleDeleteuser
  const handleDeleteuser = async (id: string) => {
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
            <h1 className="text-2xl font-semibold">Subscribers</h1>
            <h1 className="text-xl">Total subscribers: 500</h1>
          </div>
          <Link href={"/plan-management"}>
            <Button size={"lg"} variant={"primary"}>
              <FavIcon name="dubbleSetting" />
              Plan management
            </Button>
          </Link>
        </div>
      </ShadowBox>
      <WapperBox>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
          ) : subscribersitem?.length > 0 ? (
            subscribersitem?.map((item, index) => (
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

                <TableCell>{item.subscriber_type}</TableCell>
                <TableCell>{item.starting_date}</TableCell>
                <TableCell>{item.ending_date}</TableCell>
                <TableCell>
                  <ul className="flex gap-2">
                    <li>
                      <Previewbtn onClick={() => setIsPreview(!isPreview)} />
                    </li>
                    <li>
                      <button
                        onClick={() => setSubscriberToggle(index)}
                        className="size-10 bg-transparent border-2 grid place-items-center  rounded-lg cursor-pointer"
                      >
                        {subscriberToggle === index ? (
                          <FavIcon name="off" />
                        ) : (
                          <FavIcon name="on" />
                        )}
                      </button>
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
      {/* =============subscriber details=========== */}
      <Modal
        open={isPreview}
        setIsOpen={setIsPreview}
        title="Subscriber details"
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
            <div className="flex gap-1">
              <button className="size-10 bg-transparent border-1 grid place-items-center  rounded-lg cursor-pointer">
                <FavIcon name="on" />
              </button>
              <div
                onClick={() => handleDeleteuser("55")}
                className="border cursor-pointer size-10  grid place-items-center rounded-md"
              >
                <FavIcon name="delete" className="size-5" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-medium">Bio</h1>
          <div className="border p-3 rounded-md text-[#FFF]">
            Lorem ipsum dolor sit amet consectetur. Nulla erat nisl cursus
            morbi. Vitae eu non et urna hendrerit nullam mattis. Facilisis
            consectetur bibendum mattis sed scelerisque. Quam lectus velit magna
            lacus volutpat at lacus lacus phasellus. Eu nibh aliquet lacus
            bibendum fusce massa purus luctus. Augue tortor pretium molestie
          </div>
          <div className="space-y-3 pt-2">
            <DetailsNav2
              icon={<FavIcon color="#AFAFAF" name="eye" className="size-5" />}
              text="Total views"
              value={50}
            />
            <DetailsNav2
              icon={<FavIcon name="click" className="size-5" />}
              text="Total clicks"
              value={36}
            />
            <DetailsNav2
              icon={
                <FavIcon color="#AFAFAF" name="subscriber" className="size-5" />
              }
              text="Followers increased"
              value={10}
            />
          </div>
          <Button
            onClick={() => setIsUser(!isUser)}
            size={"lg"}
            variant={"primary"}
            className="w-full font-normal  text-lg flex justify-between"
          >
            See profile
            <ArrowUpRight className="size-5" />
          </Button>
        </div>
      </Modal>
      {/* =============users=========== */}
      <Modal
        open={isUser}
        setIsOpen={setIsUser}
        title="User Details"
        titleStyle="text-center"
        className="sm:max-w-3xl"
      >
        <div className="p-1 py-10 space-y-3">
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
              onClick={() => handleDeleteuser("55")}
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
          </div>
          <div className="space-y-3 pt-2">
            <DetailsNav
              href="/users/vibe-posted"
              icon={<FavIcon name="vibePost" className="size-5" />}
              text="Vibe posted"
              value={50}
            />
            <DetailsNav
              href="/users/music-posted"
              icon={<FavIcon name="music" className="size-5" />}
              text="Music posted"
              value={36}
            />
            <DetailsNav
              href="/users/podcast-posted"
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

// DetailsNav2
function DetailsNav2({ icon, text, value }: any) {
  return (
    <div className="flex justify-between space-x-3 h-11">
      <div className="w-full flex justify-between items-center border rounded-xl px-3">
        <span className="flex gap-x-2 items-center">
          {icon} {text}:
        </span>
        <span>{value}</span>
      </div>
    </div>
  );
}

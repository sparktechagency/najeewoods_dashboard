"use client";
import React, { useState, useRef, useEffect } from "react";
import navbg from "@/assets/navber-bg.png";
import Image from "next/image";
import FavIcon from "@/icon/favIcon";
import { formatDate } from "@/lib";
import { Button, Input } from "@/components/ui";
import { ImgBox } from "@/components/reuseble/img-box";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { useSearch } from "../search-box";

export default function Navber() {
  const { searchText, setSearchText } = useSearch();
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current?.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    const onScroll = () =>
      navRef.current?.classList.toggle("nav-sticky", window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={navRef}
      className="h-42 [transition:0.5s]  relative w-full px-5 pt-5"
    >
      <Image src={navbg} alt="title" fill className="object-cover z-0" />
      <div className="relative pl-[80px] z-10">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-x-1 blur-bg h-12 rounded-xl px-5 w-fit">
              <FavIcon name="calender" />
              {formatDate(new Date())}
            </div>
          </div>
          {/* seach box */}
          <div className="relative w-full md:max-w-xs  xl:max-w-xl 2xl:max-w-2xl blur-bg rounded-full py-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-grays" />
            <Input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full border-none w-full placeholder:text-grays"
            />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <Link href="/notification">
                <Button className="size-12 cursor-pointer blur-bg has-[>svg]:px-0 rounded-full">
                  <FavIcon className="size-5" name="noti" />
                </Button>
              </Link>
              <div>
                <button
                  className="flex space-x-2 cursor-pointer"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <ImgBox
                    alt="profile"
                    className="size-12 cursor-pointer"
                    src="/profile.svg"
                  />
                  <div className="text-start leading-5">
                    <h1 className="font-medium">Elizabeth Olson</h1>
                    <h1>example@gmail.com</h1>
                  </div>
                </button>

                {/* Show menu */}
                <AnimatePresence initial={false}>
                  {dropdownOpen && (
                    <motion.div
                      ref={contentRef}
                      className="absolute z-[99] right-0 mt-4 flex w-[260px] flex-col text-white rounded-lg bg-[#1D1D1D]/20 backdrop-blur-3xl shadow-md transition-all"
                      initial={{ opacity: 0, scaleY: 0, originY: "top" }}
                      animate={{ opacity: 1, scaleY: 1, originY: "top" }}
                      exit={{ opacity: 0, scaleY: 0, originY: "top" }}
                    >
                      <div className="flex flex-col space-y-3 p-4">
                        <Link
                          href={`/profile?tab=overview`}
                          className="bg-[#1D1D1D]/20 rounded-md h-10 flex items-center justify-between px-2"
                        >
                          <span className="flex gap-x-2 items-center">
                            <FavIcon className="size-5" name="admin" />
                            Admin profile
                          </span>
                          <ArrowUpRight className="size-5" />
                        </Link>
                        <Link
                          href={`/profile?tab=password`}
                          className="bg-[#1D1D1D]/20 rounded-md h-10 flex items-center justify-between px-2"
                        >
                          <span className="flex gap-x-2 items-center">
                            <FavIcon className="size-5" name="password" />
                            Change password
                          </span>
                          <ArrowUpRight className="size-5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .nav-sticky {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          height: 80px;
        }
      `}</style>
    </div>
  );
}

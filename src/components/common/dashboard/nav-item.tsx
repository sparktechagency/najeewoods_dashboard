"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import FavIcon from "@/icon/favIcon";
import { motion } from "framer-motion"; 

interface NavItem {
  icon: any;
  href?: string;
  submenu?: NavItem[];
}

export default function NavItem({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLUListElement | null)[]>([]);

  useEffect(() => {
    menuRefs.current.forEach((menu, index) => {
      if (menu) {
        menu.style.maxHeight = activeSubmenu === index ? `${menu.scrollHeight}px` : "0";
        menu.style.opacity = activeSubmenu === index ? "1" : "0";
      }
    });
  }, [activeSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setActiveSubmenu((prev) => (prev === index ? null : index));
  };

  return (
    <ul className="flex flex-col items-center space-y-5">
      {items?.map(({ icon, href, submenu }, parentIndex) => (
        <li key={parentIndex} className="group relative">
          {href ? (
            <Link
              href={href}
              className={`${
                pathname === href ? "bgOne" : ""
              } w-12 h-12 flex items-center justify-center rounded-xl transition-colors duration-200`}
            >
              <FavIcon
                activeColor={pathname === href ? "#ffffff" : ""}
                name={icon}
              />
            </Link>
          ) : (
            <div
              onClick={() => handleSubmenuToggle(parentIndex)}
              className="flex items-center px-3 py-2 relative justify-between cursor-pointer rounded-xl transition-colors duration-200"
            >
              <span className="flex items-center gap-x-2 font-medium">
                <FavIcon name={icon} />
              </span>
              <span className="absolute top-1/2 -translate-y-1/2 -right-3">
                {activeSubmenu === parentIndex ? (
                  <ChevronUp className="size-5 text-[#AFAFAF] font-extrabold transition-transform duration-200" />
                ) : (
                  <ChevronDown className="size-5 text-[#AFAFAF] font-extrabold transition-transform duration-200" />
                )}
              </span>
            </div>
          )}

          {submenu && (
            <motion.ul
              ref={(el) => {
                menuRefs.current[parentIndex] = el;
              }}
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{
                maxHeight: activeSubmenu === parentIndex ? `${menuRefs.current[parentIndex]?.scrollHeight}px` : "0",
                opacity: activeSubmenu === parentIndex ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute top-10 mt-3 overflow-hidden space-y-3 shadow-lg rounded-xl"
            >
              {submenu.map(({ href, icon }, subIndex) => (
                <li key={subIndex}>
                  {href && (
                    <Link
                      href={href}
                      className={`${
                        pathname === href ? "bgOne" : ""
                      } w-12 h-12 flex items-center justify-center rounded-xl transition-colors duration-200`}
                    >
                      <FavIcon
                        activeColor={pathname === href ? "#ffffff" : ""}
                        name={icon}
                      />
                    </Link>
                  )}
                </li>
              ))}
            </motion.ul>
          )}
        </li>
      ))}
    </ul>
  );
}

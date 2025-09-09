"use client";
import ShadowBox from "@/components/common/shadow-box";
import WapperBox from "@/components/reuseble/wapper-box";
import FavIcon from "@/icon/favIcon";
import { Button } from "@/components/ui";

const notifications = [
  {
    id: 1,
    title: "9+ new users registered",
    description: "Tap to view new users",
    date: "05-04-2025",
    time: "05:50 PM",
    color: "border-l-orange-500",
  },
  {
    id: 2,
    title: "9+ new vibes posted",
    description: "Tap to view new vibes",
    date: "05-04-2025",
    time: "05:50 PM",
    color: "border-l-pink-500",
  },
  {
    id: 3,
    title: "9+ new music posted",
    description: "Tap to view new music",
    date: "05-04-2025",
    time: "05:50 PM",
    color: "border-l-purple-500",
  },
  {
    id: 4,
    title: "9+ new podcast posted",
    description: "Tap to view new podcasts",
    date: "05-04-2025",
    time: "05:50 PM",
    color: "border-l-green-500",
  },
];

export default function Notifications() {
  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h1 className="text-2xl  font-semibold">Notifications</h1>
            <h1 className="text-base">6 unread notifications</h1>
          </div>
          <Button variant="primary" size="lg">
            <FavIcon color="#ffffff" name="messageRead" /> Read all
          </Button>
        </div>
      </ShadowBox>
      <WapperBox>
        <div className="mt-4">
          <div className="space-y-8 py-5">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className={`${
                  index % 2 ? "bg-modal-figma" : "bg-[#202020]"
                } text-white border-l-4 ${
                  notification.color
                } p-3 grid grid-cols-1 lg:grid-cols-3 rounded-md`}
              >
                <div className="mb-2 md:mb-0">
                  <h3 className="lg:text-base xl:text-xl font-semibold ">
                    {notification.title}
                  </h3>
                  <p className="text-sm ">
                    {notification.description}{" "}
                    <span className="text-gray1 cursor-pointer">
                      Tap to view
                    </span>
                  </p>
                </div>
                <ul className="md:left-1/2 relative space-y-2 *:text-secondery-figma">
                  <li className="flex items-center gap-1">
                    <FavIcon
                      name="calender"
                      color="#AFAFAF"
                      className="size-4"
                    />
                    <span className="text-sm">{notification.date}</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <FavIcon name="time" className="size-4" />
                    <span className="text-sm">{notification.time}</span>
                  </li>
                </ul>

                <div className="text-gray-500  items-center hidden md:flex md:justify-end">
                  <FavIcon name="messageUnRead" className="size-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </WapperBox>
    </div>
  );
}

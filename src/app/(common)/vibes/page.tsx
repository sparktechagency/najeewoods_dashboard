"use client";
import ShadowBox from "@/components/common/shadow-box";
import WapperBox from "@/components/reuseble/wapper-box";
import photo1 from "@/assets/unuse/photo1.jpg";
import { ImgBox } from "@/components/reuseble/img-box";
import Avatars from "@/components/reuseble/avater";
import FavIcon from "@/icon/favIcon";

// Define the visibility types for better TypeScript inference
type Visibility = "everyOne" | "friends" | "onlyMe";

interface User {
  id: number;
  name: string;
  image: string;
  role: string;
  visibility: Visibility;
  locked?: boolean;
}

const users: User[] = [
  { id: 1, name: "John Doe", image: "image1.jpg", role: "Mental", visibility: "everyOne" },
  { id: 2, name: "John Doe", image: "image2.jpg", role: "Mental", visibility: "friends" },
  { id: 3, name: "John Doe", image: "image3.jpg", role: "Mental", visibility: "onlyMe" },
  { id: 4, name: "John Doe", image: "image4.jpg", role: "Mental", visibility: "onlyMe" },
  { id: 5, name: "John Doe", image: "image5.jpg", role: "Mental", visibility: "everyOne" },
  { id: 6, name: "John Doe", image: "image6.jpg", role: "Mental", visibility: "friends"},
  { id: 7, name: "John Doe", image: "image7.jpg", role: "Mental", visibility: "everyOne" },
  { id: 8, name: "John Doe", image: "image8.jpg", role: "Mental", visibility: "everyOne" },
  { id: 9, name: "John Doe", image: "image9.jpg", role: "Mental", visibility: "everyOne" },
  { id: 10, name: "John Doe", image: "image10.jpg", role: "Mental", visibility: "everyOne" },
  { id: 11, name: "John Doe", image: "image11.jpg", role: "Mental", visibility: "everyOne" },
  { id: 12, name: "John Doe", image: "image12.jpg", role: "Mental", visibility: "everyOne" },
  { id: 13, name: "John Doe", image: "image13.jpg", role: "Mental", visibility: "everyOne" },
  { id: 14, name: "John Doe", image: "image14.jpg", role: "Mental", visibility: "everyOne" },
  { id: 15, name: "John Doe", image: "image15.jpg", role: "Mental", visibility: "everyOne" },
  { id: 16, name: "John Doe", image: "image16.jpg", role: "Mental", visibility: "everyOne" },
];

// Define the user visibility icons properly
const userVisibiliy: Record<Visibility, any> = {
  everyOne: <FavIcon className="size-4" name="internet" />,
  friends: <FavIcon className="size-5" name="friends" />,
  onlyMe: <FavIcon className="size-4" name="lock" />,
};

export default function Vibes() {
  return (
    <div>
      <ShadowBox>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h1 className="text-2xl font-semibold">Vibes</h1>
            <h1 className="text-base">Total vibes: 25</h1>
          </div>
        </div>
      </ShadowBox>
      <WapperBox>
        <div className="pt-4 flex gap-6 lg:gap-4  2xl:gap-6 flex-wrap">
          {users?.map((item, index) => (
            <ImgBox
              src={photo1}
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
                    src={"/profile.svg"}
                    fallback={"E"}
                    alt="profile"
                    fallbackStyle="bg-[#cb4ec9]/70 text-white"
                  />
                  <div className="leading-5 w-max">
                    <h1 className="flex font-medium items-center">
                      {item.name}
                      <span className="ml-1">{userVisibiliy[item.visibility]}</span>
                    </h1>
                    <h1 className="text-secondery-figma">😥Mental</h1>
                  </div>
                </div>
              </div>
            </ImgBox>
          ))}
        </div>
      </WapperBox>
    </div>
  );
}

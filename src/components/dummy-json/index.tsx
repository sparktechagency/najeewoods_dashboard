import assets from "@/assets";
import { ImgBox } from "@/components/reuseble/img-box";

export const dummyJson = {
  meta: {
    current_page: 1,
    per_page: 10,
    total: 20
  }
}


//  vibeOptions
export const vibeOptions = [
  {
    label: "Chill",
    value: "chill",
    icon: <ImgBox className="size-8" src={assets.emoji.chill} alt="img" />,
  },
  {
    label: "Party",
    value: "party",
    icon: <ImgBox className="size-7" src={assets.emoji.party} alt="img2" />,
  },
  {
    label: "Mental",
    value: "mental",
    icon: <ImgBox className="size-7" src={assets.emoji.mental} alt="img3" />,
  },
  {
    label: "Hot",
    value: "hot",
    icon: <ImgBox className="size-7" src={assets.emoji.hot} alt="img4" />,
  },
  {
    label: "Angry",
    value: "angry",
    icon: (
      <ImgBox className="size-[23px]" src={assets.emoji.angry} alt="img5" />
    ),
  },
];

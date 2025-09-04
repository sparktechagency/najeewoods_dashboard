import FavIcon from "@/icon/favIcon";
import { cn } from "@/lib";

type BtnProps = {
  onClick?: () => void;
  className?:string
};

// Previewbtn
export function Previewbtn({ onClick }: BtnProps) {
  return (
    <button
      onClick={onClick}
      className="size-10 bg-transparent border-2 grid place-items-center  rounded-lg cursor-pointer"
    >
      <FavIcon name="eye" />
    </button>
  );
}

// Deletebtn
export function Deletebtn({ onClick,className }: BtnProps) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={cn(`size-10 bg-transparent border-2 grid place-items-center  rounded-lg cursor-pointer`,className)}
    >
      <FavIcon name="delete" />
    </button>
  );
}
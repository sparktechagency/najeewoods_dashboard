import FavIcon from "@/icon/favIcon";
import React from "react";

interface LikeToggleProps {
  isLike: boolean;
  likes: any;
}

export default function LikeToggle({ isLike, likes }: LikeToggleProps) {
  return (
    <div className="border rounded-md h-10 flex space-x-2 items-center px-2">
      <span>
        {" "}
        <FavIcon name={isLike ? "like" : "likeLine"} />
      </span>
      <span>{likes}</span>
    </div>
  );
}

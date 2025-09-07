import FavIcon from "@/icon/favIcon";
import React, { useState } from "react";

export default function LikeToggle() {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(120);

  const handleLikeToggle = () => {
    setIsLike(!isLike);
    setLikeCount(prevCount => isLike ? prevCount - 1 : prevCount + 1);
  };

  return (
    <div className="border rounded-md h-10 flex space-x-2 items-center px-2">
      <span onClick={handleLikeToggle}>
        {" "}
        <FavIcon
          className="cursor-pointer"
          name={isLike ? "like" : "likeLine"}
        />
      </span>
      <span>{likeCount}</span>
    </div>
  );
}

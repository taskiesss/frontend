"use client";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = { numberOfLikes: number; communityId: string };

function LikeButton({ numberOfLikes, communityId }: Props) {
  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <div className="flex items-center gap-1 self-start">
      <button onClick={() => setIsLiked(!isLiked)} className="block">
        <FontAwesomeIcon
          icon={faHeart}
          className={`${
            isLiked ? "text-red-500" : ""
          } text-xl hover:text-2xl transition-all duration-200`}
        />{" "}
      </button>
      {/* Like Icon */}
      <button className="text-md hover:underline">{numberOfLikes}</button>
    </div>
  );
}

export default LikeButton;

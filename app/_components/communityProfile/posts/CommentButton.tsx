import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = { numberOfComments: number; communityId: string };

function CommentButton({ numberOfComments, communityId }: Props) {
  return (
    <div className="flex items-center gap-1 self-start">
      <button className="block">
        <FontAwesomeIcon
          icon={faComment}
          className="text-xl hover:text-2xl transition-all duration-200"
        />{" "}
      </button>
      {/* Comment Icon */}
      <button className="text-md hover:underline">{numberOfComments}</button>
    </div>
  );
}

export default CommentButton;

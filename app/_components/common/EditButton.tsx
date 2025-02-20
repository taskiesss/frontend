import { faPenToSquare } from "@fortawesome/free-regular-svg-icons/faPenToSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function EditButton({
  onClick,
  className = "text-xl",
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button onClick={onClick} className={` underline ${className}`}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  );
}

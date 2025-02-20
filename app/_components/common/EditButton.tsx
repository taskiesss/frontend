import { faPenToSquare } from "@fortawesome/free-regular-svg-icons/faPenToSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-2xl underline">
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  );
}

"use client";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = { description: string; splitchar?: number };

function DescriptionComponent({ description, splitchar }: Props) {
  const [showMore, setShowMore] = useState(false);
  const char = splitchar ? splitchar : 200;
  return (
    <p className="whitespace-pre-wrap  opacity-80">
      {showMore ? description : description.slice(0, char)}{" "}
      {description.length > char && (
        <button
          className="text-[var(--btn-color)] hover:text-[var(--button-hover-background-color)] opacity-100 font-normal"
          onClick={() => setShowMore((s) => !s)}
        >
          ...
          <FontAwesomeIcon
            icon={showMore ? faChevronCircleLeft : faChevronCircleRight}
            className="text-xl"
          />
        </button>
      )}
    </p>
  );
}

export default DescriptionComponent;

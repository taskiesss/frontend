import {
  faChevronCircleDown,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronCircleUp,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

type Props = { description: string };

function DescriptionComponent({ description }: Props) {
  const [showMore, setShowMore] = useState(false);
  return (
    <p className="whitespace-pre-wrap  opacity-90">
      {showMore ? description : description.slice(0, 200)}{" "}
      {description.length > 200 && (
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

"use client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DropdownMenu } from "./DropDownMenu";

interface Option {
  label: string;
  value: string;
}
type Props = { options: Option[]; children?: React.ReactNode };
export default function CustomeSelection({ options, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    options[0].value
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[var(--btn-color)] text-[var(--accent-color)] px-4 py-2 rounded border border-[var(--hover-color)] flex items-center gap-2 min-w-[160px] justify-between hover:bg-[var(--button-hover-background-color)]"
      >
        <span>
          {children} {selectedOption && `: ${selectedOption}`}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-[var(--hover-color)] text-sm transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          size="sm"
        />
      </button>

      {/* Dropdown Menu */}
      <DropdownMenu
        setSelectedOption={setSelectedOption}
        options={options}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        {children}
      </DropdownMenu>
    </div>
  );
}

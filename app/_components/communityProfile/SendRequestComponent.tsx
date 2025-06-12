/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAvailablePositions,
  sendJoinRequest,
} from "@/app/_lib/CommunityProfile/JoinRequest";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ProtectedPage from "../common/ProtectedPage";

type Props = {
  communityId: string;
  communityName: string;
  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
};
interface OpenPositions {
  content: {
    id: string;
    positionName: string;
    percentage: number;
    description: string;
  }[];
}

function SendRequestComponent({
  communityId,
  communityName,
  isClicked,
  setIsClicked,
}: Props) {
  const [isFocused, setIsFocused] = useState<string>("");
  const [isForbidden, setIsForbidden] = useState(false);
  const [positions, setPositions] = useState<OpenPositions>();

  useEffect(() => {
    const fetchPosition = async () => {
      const token = Cookies.get("token");
      try {
        const positions = await getAvailablePositions(communityId, token);
        console.log(positions);
        setPositions(positions);
      } catch (error: any) {
        if (
          error.message === "Forbidden" ||
          error.message === "Unauthorized user"
        ) {
          setIsForbidden(true);
        }
      }
    };

    fetchPosition();
  }, [communityId]);

  // Handle page scroll when modal opens/closes
  useEffect(() => {
    if (isClicked) {
      document.body.style.overflow = "hidden"; // Hide page scrollbar
    } else {
      document.body.style.overflow = "auto"; // Restore page scrollbar
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isClicked]);

  const handleRequest = async () => {
    const token = Cookies.get("token");
    try {
      await sendJoinRequest(communityId, isFocused, token);
    } catch (error: any) {
      if (
        error.message === "Forbidden" ||
        error.message === "Unauthorized user"
      ) {
        setIsForbidden(true);
      }
    } finally {
      setIsClicked(false);
      setIsFocused("");
    }
  };
  if (isForbidden)
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );
  return (
    <>
      {isClicked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="max-h-[50rem] bg-[var(--background-color)] p-7 rounded-lg border-[var(--border-color)] border-solid border-2 max-w-4xl w-full overflow-y-auto bg-scroll  ">
            <div className="flex flex-col gap-2 pb-6">
              <h3 className="text-3xl font-bold ">{communityName}</h3>
              <p className="text-lg font-extralight text-gray-500 ">
                Select a position to request to join
              </p>
            </div>
            {/* Positiosn */}
            <div className="flex flex-col gap-5">
              {positions?.content.map((p, i) => (
                <div
                  key={i}
                  className={`cursor-pointer flex flex-col gap-5 py-6 justify-between items-center border-solid border-2 px-5 rounded-xl ${
                    p.id == isFocused &&
                    "bg-[var(--foreground-color)] border-[var(--hover-color)]"
                  }`}
                  onClick={() => setIsFocused(p.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-5 items-center">
                      <p className="text-xl font-semibold">{p.positionName}</p>

                      <p
                        className={`text-green-500 ${
                          p.id === isFocused && "text-green-600"
                        }`}
                      >
                        $ {p.percentage}% of project value
                      </p>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-xl"
                    />
                  </div>
                  {p.id === isFocused && (
                    <p className="whitespace-pre-wrap w-10/11 self-start text-lg">
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-4 py-6">
              <button
                type="button"
                onClick={() => {
                  setIsClicked(false);
                  setIsFocused("");
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isFocused === ""}
                onClick={handleRequest}
                className={`px-4 py-2 bg-[var(--btn-color)]  rounded-lg  transition-colors ${
                  !(isFocused === "")
                    ? "hover:bg-[var(--button-hover-background-color)]"
                    : "cursor-default"
                }`}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SendRequestComponent;

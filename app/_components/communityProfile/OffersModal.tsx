import Image from "next/image";

type Voter = {
  name: string;
  position: string;
  freelancerProfilePicture: string;
};

type VoteDetails = {
  accepted: Voter[];
  rejected: Voter[];
  remaining: Voter[];
};

type VoteDetailsModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  votesLoading: boolean;
  votesError: boolean;
  votesErrorMessage: Error | string | null;
  voteDetails?: VoteDetails;
  activeTab: "accepted" | "rejected" | "remaining";
  setActiveTab: (tab: "accepted" | "rejected" | "remaining") => void;
};

const VoteDetailsModal = ({
  isOpen,
  closeModal,
  votesLoading,
  votesError,
  votesErrorMessage,
  voteDetails,
  activeTab,
  setActiveTab,
}: VoteDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>

      {/* Modal Content */}
      <div
        className="
          relative bg-white rounded-lg shadow-lg 
          w-[95%] sm:w-[42rem] max-w-[95%] 
          h-[85vh] max-h-[48rem] 
          overflow-hidden
        "
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h3 className="text-3xl font-bold text-center flex-1">
            Vote Details
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-gray-800 text-3xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 h-[calc(100%-6rem)]">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            {(["accepted", "rejected", "remaining"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  flex-1 text-center py-4 text-xl 
                  ${
                    activeTab === tab
                      ? "border-b-2 border-blue-500 font-bold text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="h-[calc(100%-6rem)] overflow-y-auto">
            {votesLoading && (
              <p className="text-center text-gray-500 text-xl">
                Loading votes...
              </p>
            )}
            {votesError && (
              <p className="text-center text-red-600 text-xl">
                {votesErrorMessage instanceof Error
                  ? votesErrorMessage.message
                  : votesErrorMessage || "Error loading votes"}
              </p>
            )}
            {voteDetails && !votesLoading && !votesError && (
              <ul className="space-y-8 p-4">
                {voteDetails[activeTab].length === 0 ? (
                  <li className="text-center text-gray-500 text-xl">
                    No votes in this category
                  </li>
                ) : (
                  voteDetails[activeTab].map((voter, index) => (
                    <li
                      key={index}
                      className="flex flex-col items-center space-y-6"
                    >
                      <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden">
                        <Image
                          src={voter.freelancerProfilePicture}
                          alt={voter.name}
                          fill
                          sizes="(max-width: 426px) 5rem, 7rem"
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-medium">{voter.name}</p>
                        <p className="text-lg text-gray-500">
                          {voter.position}
                        </p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteDetailsModal;

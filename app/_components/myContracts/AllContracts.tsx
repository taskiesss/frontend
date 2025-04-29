import Container from "../common/Container";
import AdvancedSearchButton from "./AdvancedSearchButton";
import ContractList from "./ContractList";

type Props = {
  contracts: {
    content: {
      contractID: string;
      jobID: string;
      jobTitle: string;
      clientName: string;
      clientID: string;
      contractStatus: "ACTIVE" | "ENDED";
      budget: number;
      activeMilestone: string;
      clientRateForFreelancer?: number;
      startDate: string;
      dueDate?: string;
      endDate?: string;
    }[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
  role?: string;
};

function AllContracts({ contracts, role }: Props) {
  return (
    <Container className="pt-10 flex flex-col gap-8">
      <h1 className="text-4xl">All Contracts</h1>
      <div className="flex-col bg-[var(--foreground-color)] flex items-start rounded-xl p-4 ">
        <div className="flex items-center gap-5 w-full border-b-2 border-solid border-[var(--border-color)] py-5">
          <AdvancedSearchButton role={role} />
        </div>
        {contracts.content.length > 0 ? (
          <div className="flex flex-col gap-4 w-full">
            <ContractList contracts={contracts} />
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="self-center text-2xl">
              There are no contracts yet
            </span>
          </div>
        )}
      </div>
    </Container>
  );
}

export default AllContracts;

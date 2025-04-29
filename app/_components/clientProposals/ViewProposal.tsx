import { ProposalDetails } from "@/app/_types/ClientProposalsTypes";
import {
  faCircleCheck,
  faCircleXmark,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import {
  faFileAlt,
  faLink,
  faMoneyCheck,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Container from "../common/Container";
import Button from "../common/button";
import MilestoneList from "./MilestoneList";

type Props = { proposal: ProposalDetails; role?: string };

const TASKAYA_SERVICE = 0.02;
const paymentOptions = (s: string) =>
  s === "PerMilestones" ? "Per Milestone" : "Per Project";
function ViewProposal({ proposal, role }: Props) {
  //  Calculations for client
  const totalPrice = proposal.totalHours * proposal.pricePerHour;
  const service = totalPrice * TASKAYA_SERVICE;
  const discountedTotalPrice = totalPrice - service;

  return (
    <Container className="flex flex-col items-center py-20">
      <div className="border-solid border-2 rounded-lg overflow-hidden border-gray-600 w-10/12 flex flex-col gap-10">
        <div className="flex bg-[var(--foreground-color)] px-20 pb-10 gap-4 w-full">
          <div className=" items-center pt-12 ">
            <FontAwesomeIcon icon={faFileAlt} className="text-5xl" />
          </div>
          <div className="flex flex-col gap-3 pt-12 ">
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-3xl">Application from</p>
              <Link
                href={
                  role !== "client"
                    ? proposal.isCommunity
                      ? `/nx/freelancer/communities/${proposal.freelancerId}`
                      : `/nx/freelancer/myprofile`
                    : proposal.isCommunity
                    ? `/nx/client/discover-communities/${proposal.freelancerId}`
                    : `/nx/client/discover-talents/${proposal.freelancerId}`
                }
                className="text-3xl font-semibold hover:text-[var(--button-hover-background-color)] hover:underline"
              >
                {proposal.freelancerName}{" "}
                <FontAwesomeIcon icon={faLink} className="text-xl " />
              </Link>
              {proposal.status === "PENDING" && (
                <span className=" items-center px-2 py-1 rounded-xl text-md font-medium bg-[var(--status-inprogress)] text-white flex gap-1">
                  <FontAwesomeIcon icon={faClock} />
                  Pending
                </span>
              )}
              {proposal.status === "ACCEPTED" && (
                <span className=" items-center px-2 py-1 rounded-xl text-md font-medium bg-[var(--status-active)] text-white flex gap-1">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  Accepted
                </span>
              )}
              {proposal.status === "DECLINED" && (
                <span className=" items-center px-2 py-1 rounded-xl text-md font-medium bg-red-500 text-white flex gap-1">
                  <FontAwesomeIcon icon={faCircleXmark} />
                  Declined
                </span>
              )}
              {proposal.status === "HIRED" && (
                <span className="items-center px-2 py-1 rounded-xl text-md font-medium bg-blue-600 text-white flex gap-1">
                  <FontAwesomeIcon icon={faSuitcase} />
                  Hired
                </span>
              )}
            </div>
            <p className="text-xl opacity-80">for: {proposal.jobName}</p>
          </div>
        </div>
        <div className="flex flex-col  gap-5 px-20 pb-4 rounded-lg w-full">
          <h1 className="text-3xl">Terms</h1>
          <div className="flex flex-col gap-3">
            <p className="text-lg">Payment Method</p>
            <input
              type="text"
              name="PER"
              defaultValue={paymentOptions(proposal.paymentMethod)}
              disabled
              className="border border-solid w-1/4 border-[var(--border-color)] focus:outline-none bg-[var(--background-color)] text-lg py-2 px-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-lg">Expected price per hour</label>
            <input
              type="number"
              disabled
              name="pricePerHour"
              id="pricePerHour"
              defaultValue={proposal.pricePerHour}
              min="0"
              className="border border-solid w-1/4 border-[var(--border-color)] focus:outline-none bg-[var(--background-color)] text-lg py-2 px-2 rounded-lg"
              required
            />
          </div>
        </div>

        {/* milestone section */}
        <section className="flex flex-col gap-4  border-t border-solid border-[var(--border-color)] pt-5 w-full px-20 ">
          <span className="text-3xl">Milestones</span>
          <MilestoneList proposalId={proposal.proposalId} />
        </section>

        {/* Price */}
        <section className="border-t border-[var(--border-color)] border-solid flex px-20 pb-10 pt-5 justify-start flex-row-reverse">
          <div className="flex flex-col w-1/2 gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="text-lg">Total Price of Project</span>
                <span className="text-red-600 text-lg">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <span className="opacity-65">
                This includes all milestones, and is the amount you will{" "}
                {role === "client" ? "pay" : "recieve"}
              </span>
            </div>
            <div className="flex justify-between border-solid border border-[var(--border-color)] border-b-0 border-l-0 border-r-0 py-3 text-lg">
              <span>Taskaya Service Fee</span>
              <span className="opacity-65">${service.toFixed(2)}</span>
            </div>
            <div>
              <div className="flex justify-between border-solid border border-[var(--border-color)] border-b-0 border-l-0 border-r-0 py-3 gap-3 text-lg">
                <span>
                  {role === "client"
                    ? "Your Freelancer will Receive"
                    : "You'll Receive"}
                </span>
                <span className="text-[var(--accent-color)]">
                  ${discountedTotalPrice.toFixed(2)}
                </span>
              </div>
              <span className="opacity-65">
                Estimated payment, after service fees
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center flex-1">
            <FontAwesomeIcon icon={faMoneyCheck} size="10x" />
          </div>
        </section>
        {/* Cover Letter and Attachment       */}
        <section className=" rounded-lg pt-5 px-20 pb-10 flex flex-col gap-5 border-t border-solid border-[var(--border-color)]">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Cover Letter</h1>
            <textarea
              disabled
              name="coverLetter"
              id="coverLetter"
              defaultValue={proposal.coverLetter}
              className="border border-solid border-[var(--border-color)] focus:outline-none bg-[var(--background-color)] text-lg box-content resize-none py-2 px-2 rounded-lg whitespace-pre-wrap"
              required
            />
          </div>
          {proposal.attachment && (
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl">Attachments</h3>
              <a
                href={proposal.attachment}
                className="flex gap-1 pointer-events-auto items-center cursor-pointer hover:text-[var(--button-hover-background-color)] transition-all hover:underline"
              >
                <FontAwesomeIcon icon={faLink} />
                <p>Attachment</p>
              </a>
            </div>
          )}
        </section>
        {proposal.status === "PENDING" && role === "client" && (
          <Link
            href={`/nx/client/mycontracts/new/${proposal.proposalId}`}
            className="flex justify-end px-20 pb-10"
          >
            <Button type="button" className="text-lg">
              Hire
            </Button>
          </Link>
        )}
      </div>
    </Container>
  );
}

export default ViewProposal;

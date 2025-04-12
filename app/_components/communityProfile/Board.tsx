import CommunityProfileResponse from "@/app/_types/CommunityProfileResponse";
import TalentRequests from "./TalentRequest";
import { Suspense } from "react";
import Spinner from "../common/Spinner";
import Contracts from "./Contracts";
import CommunityOffers from "./Offers";

interface Props {
  community: CommunityProfileResponse;
  id: string;
  style: string;
}

export default function Board({ community, id, style }: Props) {
  return (
    <>
      <div className={style}>
        <Suspense fallback={<Spinner />}>
          <TalentRequests
            editable={community.isAdmin}
            communityId={id}
          ></TalentRequests>
        </Suspense>
      </div>
      <div className={style}>
        <Suspense fallback={<Spinner />}>
          <CommunityOffers
            editable={community.isMember}
            communityId={id}
          ></CommunityOffers>
        </Suspense>
      </div>
      <div className={style}>
        <Suspense fallback={<Spinner />}>
          <Contracts communityId={id}></Contracts>
        </Suspense>
      </div>
    </>
  );
}

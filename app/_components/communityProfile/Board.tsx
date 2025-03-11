import CommunityProfileResponse from "@/app/_types/CommunityProfileResponse";
import TalentRequest from "./TalentRequest";
import { Suspense } from "react";

interface Props {
  community: CommunityProfileResponse;
  id: string;
  style: string;
}

export default function Board({ community, id, style }: Props) {
  return (
    <div className={style}>
      <Suspense>
        <TalentRequest
          editable={community.isAdmin}
          communityId={id}
        ></TalentRequest>
      </Suspense>
    </div>
  );
}

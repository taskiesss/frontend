import CommunityProfileResponse from "@/app/_types/CommunityProfileResponse";

interface Props {
  editable: boolean;
  community: CommunityProfileResponse;
  id: string;
  style: string;
}

export default function Board({ community, editable, id, style }: Props) {
  // Dummy data for job postings or talent listings
  const dummyJobs = [
    {
      title: "Frontend Developer Needed",
      rate: "$50/hr",
      skills: ["React", "TypeScript"],
    },
    { title: "UI/UX Designer", rate: "$45/hr", skills: ["Figma", "Adobe XD"] },
    {
      title: "Backend Engineer",
      rate: "$55/hr",
      skills: ["Node.js", "PostgreSQL"],
    },
  ];

  return (
    <div className={style}>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold">Job & Talent Board</h2>
        <div className="flex flex-col gap-4">
          {dummyJobs.map((job, index) => (
            <div
              key={index}
              className="p-4 bg-[var(--background-color)] rounded-lg shadow"
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-lg">{job.rate}</p>
              <div className="flex gap-2 flex-wrap">
                {job.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-[var(--button-background-color)] text-white rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {editable && (
        <div className="self-start mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add New Job Posting
          </button>
        </div>
      )}
    </div>
  );
}

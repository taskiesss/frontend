"use client";
import React, { useState } from "react";
import Container from "../../common/Container";
import SkillsSearchInput from "../../common/SkillsSearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../common/button";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createCommunity } from "@/app/_lib/FreelancerProfile/myCommunities";
import { useRouter } from "next/navigation";
import ProtectedPage from "../../common/ProtectedPage";

interface Props {
  token?: string; // Token passed from server
}

type Position = {
  id: string;
  positionName: string;
  percentage: string;
  description: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="text-lg" disabled={pending}>
      {pending ? "Creating..." : "Create Community"}
    </Button>
  );
}

function CommunityPostForm({ token }: Props) {
  const router = useRouter();

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [communityName, setCommunityName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [avrgHoursPerWeek, setAvrgHoursPerWeek] = useState("");
  const [adminRole, setAdminRole] = useState({
    positionName: "",
    percentage: "",
    description: "",
  });
  const [positions, setPositions] = useState<Position[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [state, formAction] = useActionState(async () => {
    if (!validatePercentages()) return;

    const requestData = {
      communityName,
      description,
      title,
      pricePerHour: parseFloat(pricePerHour),
      avrgHoursPerWeek: parseFloat(avrgHoursPerWeek),
      skills: selectedSkills,
      adminRole: {
        positionName: adminRole.positionName,
        percentage: parseFloat(adminRole.percentage),
        description: adminRole.description,
      },
      communityPositions: positions.map((pos) => ({
        positionName: pos.positionName,
        percentage: parseFloat(pos.percentage),
        description: pos.description,
      })),
    };

    try {
      if (!token) throw new Error("Unauthorized");
      await createCommunity(requestData, token);

      // Handle success navigation
      router.push("/nx/freelancer/mycommunities");
    } catch (error) {
      // Handle error
      console.error(error.message);
    }
  }, undefined);

  if (!token) {
    return <ProtectedPage message="Session expired. Please log in again." />;
  }

  const handleSelectSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills((prev) =>
      prev.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleAddPosition = () => {
    setPositions([
      ...positions,
      {
        id: Math.random().toString(36).substring(2, 11),
        positionName: "",
        percentage: "",
        description: "",
      },
    ]);
  };

  const handleRemovePosition = (idToRemove: string) => {
    setPositions((prev) => prev.filter((pos) => pos.id !== idToRemove));
  };

  const handlePositionChange = (
    index: number,
    field: keyof Position,
    value: string
  ) => {
    const newPositions = [...positions];
    newPositions[index][field] = value;
    setPositions(newPositions);
  };

  const handleAdminRoleChange = (
    field: keyof typeof adminRole,
    value: string
  ) => {
    setAdminRole({ ...adminRole, [field]: value });
  };

  const validatePercentages = () => {
    const adminPercent = parseFloat(adminRole.percentage || "0");
    const positionsTotal = positions.reduce(
      (sum, pos) => sum + parseFloat(pos.percentage || "0"),
      0
    );
    const total = adminPercent + positionsTotal;

    if (Math.abs(total - 100) > 0.01) {
      setValidationError("Total percentage must equal 100%");
      return false;
    }
    setValidationError(null);
    return true;
  };

  return (
    <Container className="flex flex-col items-center py-20">
      <div className="border-solid border-2 rounded-lg overflow-hidden border-gray-600 w-10/12 flex flex-col gap-10">
        <div className="flex flex-col gap-5 bg-[var(--foreground-color)] px-20 pb-10 w-full">
          <h1 className="text-5xl pt-12">
            <FontAwesomeIcon icon={faUsers} /> Create Community
          </h1>
          <span className="text-2xl text-slate-500">
            Build your professional community
          </span>
        </div>

        <form
          action={formAction}
          className="w-full flex flex-col pb-20 gap-10 items-center px-20"
        >
          {validationError && (
            <div className="w-full text-red-500 text-lg">{validationError}</div>
          )}

          <div className="flex flex-col gap-3 w-full">
            <span className="text-xl">Community Name</span>
            <input
              required
              type="text"
              name="communityName"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              placeholder="ex: Web Developers Collective"
              className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <span className="text-xl">Title/Tagline</span>
            <input
              required
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex: Professional web development network"
              className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <span className="text-xl">Description</span>
            <textarea
              required
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your community's purpose..."
              className="resize-none px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
              rows={5}
            />
          </div>

          <div className="flex w-full gap-6">
            <div className="w-full flex flex-col gap-3">
              <span className="text-xl">Price Per Hour</span>
              <input
                required
                type="number"
                name="pricePerHour"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                placeholder="ex: 50"
                className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <span className="text-xl">Avg Hours/Week</span>
              <input
                required
                type="number"
                name="avrgHoursPerWeek"
                value={avrgHoursPerWeek}
                onChange={(e) => setAvrgHoursPerWeek(e.target.value)}
                placeholder="ex: 20"
                className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span className="text-lg">Skills</span>
            <SkillsSearchInput
              className="py-4 px-3 text-lg border border-solid border-gray-600 rounded-lg"
              selectedSkills={selectedSkills}
              onSelectSkill={handleSelectSkill}
              onRemoveSkill={handleRemoveSkill}
            />
          </div>

          <div className="w-full border-t border-gray-600 pt-6">
            <h3 className="text-2xl mb-4">Admin Role</h3>
            <div className="flex flex-col gap-3">
              <input
                required
                type="text"
                placeholder="Position name"
                value={adminRole.positionName}
                onChange={(e) =>
                  handleAdminRoleChange("positionName", e.target.value)
                }
                className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
              />
              <input
                required
                type="number"
                placeholder="Percentage"
                value={adminRole.percentage}
                onChange={(e) =>
                  handleAdminRoleChange("percentage", e.target.value)
                }
                className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
              />
              <textarea
                required
                placeholder="Description"
                value={adminRole.description}
                onChange={(e) =>
                  handleAdminRoleChange("description", e.target.value)
                }
                className="resize-none px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                rows={3}
              />
            </div>
          </div>

          <div className="w-full border-t border-gray-600 pt-6">
            <h3 className="text-2xl mb-4">Community Positions</h3>
            <div className="flex flex-col">
              {positions.map((pos, index) => (
                <div
                  key={pos.id}
                  className="flex flex-col gap-3 mb-4 border-b border-b-black last:border-b-0 py-6"
                >
                  <button
                    type="button"
                    onClick={() => handleRemovePosition(pos.id)}
                    className="text-red-500 hover:text-red-700 p-2 place-self-end"
                  >
                    <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                  </button>
                  <input
                    required
                    type="text"
                    placeholder="Position name"
                    value={pos.positionName}
                    onChange={(e) =>
                      handlePositionChange(
                        index,
                        "positionName",
                        e.target.value
                      )
                    }
                    className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                  />
                  <input
                    required
                    type="number"
                    placeholder="Percentage"
                    value={pos.percentage}
                    onChange={(e) =>
                      handlePositionChange(index, "percentage", e.target.value)
                    }
                    className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                  />
                  <textarea
                    required
                    placeholder="Description"
                    value={pos.description}
                    onChange={(e) =>
                      handlePositionChange(index, "description", e.target.value)
                    }
                    className="resize-none px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                    rows={3}
                  />
                </div>
              ))}
            </div>

            <Button
              type="button"
              onClick={handleAddPosition}
              className="text-lg"
            >
              + Add Position
            </Button>
          </div>

          <div className="self-end">
            <SubmitButton />
          </div>
        </form>
      </div>
    </Container>
  );
}

export default CommunityPostForm;

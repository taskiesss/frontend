/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import SettingsSmallNav from "@/app/_components/communityProfile/SettingsSmallNav";
import Container from "@/app/_components/common/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faUndo,
  faEdit,
  faCircleInfo,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  CommunityRolesResponse,
  RoleAndPosition,
  UpdatePositionRequest,
} from "@/app/_types/CommunitySettings";

import { updateCommunityPositions } from "@/app/_lib/CommunityProfile/settings";

import { useRouter } from "next/navigation";

import AddPositionForm from "@/app/_components/communityProfile/Forms/AddPositionForm";
import Spinner from "@/app/_components/common/Spinner";

type Props = {
  rolesAndPositions: CommunityRolesResponse;
  id: string;
  token?: string; // Token passed from server component for API calls
};

export default function CommunitySettingsPage({
  rolesAndPositions: initialPositions,
  id,
  token,
}: Props) {
  console.log(initialPositions);
  const router = useRouter();
  const { isUserAdmin, communityMembers } = initialPositions;
  const [futurePositions, setFuturePositions] =
    useState<RoleAndPosition[]>(communityMembers);

  // Working copy for edits that only gets applied on save
  const [editingPositions, setEditingPositions] = useState<RoleAndPosition[]>(
    []
  );

  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Input values for display only
  const [inputValues, setInputValues] = useState<string[]>([]);

  const [showAddPosition, setShowAddPosition] = useState(false);

  const handleEditClick = () => {
    // Create deep copies for editing
    const positionsCopy = JSON.parse(JSON.stringify(futurePositions));
    setEditingPositions(positionsCopy);

    // Initialize input values from current positions
    setInputValues(
      futurePositions.map((pos) => pos.futurePercentage.toString())
    );

    setIsEditing(true);
    setErrorMessage(null);
  };

  const handlePercentChange = (index: number, value: string) => {
    // Update the input values only (display state)
    const newInputValues = [...inputValues];

    // Handle empty input
    if (value === "" || value === null) {
      newInputValues[index] = "0";
      setInputValues(newInputValues);
      return;
    }

    // Remove non-digits
    let cleanedValue = value.replace(/[^\d]/g, "");

    // Remove leading zeros (but keep single zero)
    if (cleanedValue.length > 1 && cleanedValue.startsWith("0")) {
      cleanedValue = cleanedValue.replace(/^0+/, "");
    }

    // Update the display value only
    newInputValues[index] = cleanedValue;
    setInputValues(newInputValues);

    // Convert to number and bound
    const numValue = parseInt(cleanedValue || "0", 10);
    const boundedValue = Math.min(100, Math.max(0, numValue));

    // Update the editing copy only (not the actual data yet)
    setEditingPositions((prev) => {
      const newPositions = [...prev];
      newPositions[index].futurePercentage = boundedValue;

      validateTotal(newPositions);
      return newPositions;
    });
  };

  const validateTotal = (positions: RoleAndPosition[]) => {
    const total = positions.reduce((sum, pos) => sum + pos.futurePercentage, 0);
    const isValid = Math.abs(total - 100) <= 0.01;

    if (!isValid) {
      setErrorMessage("Total financial percentage must equal 100%");
    } else {
      setErrorMessage(null);
    }

    return isValid;
  };

  const handleSaveClick = async () => {
    try {
      if (!validateTotal(editingPositions)) {
        return;
      }

      // Convert to UpdatePositionRequest format
      const requestData: UpdatePositionRequest[] = editingPositions.map(
        (pos) => ({
          positionId: pos.positionId,
          positionName: pos.nameAndPicture.position,
          financialPercent: pos.futurePercentage,
          description: pos.description,
        })
      );

      console.log(id);
      console.log(requestData);
      console.log(token);

      await updateCommunityPositions(id, requestData, token);

      // Only update the current positions after successful API call

      router.refresh();

      // const newPositions: CommunityRolesResponse =
      //   await getCommunityRolesAndPositions(id, token);

      // const { communityMembers: newCommunityMembers } = newPositions;

      // setFuturePositions(newCommunityMembers);
      setIsEditing(false);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to update positions");
    }
  };

  const handleUndoClick = () => {
    // Simply exit edit mode without applying changes
    setIsEditing(false);
    setErrorMessage(null);
    console.log(editingPositions);
  };

  const handleDeleteClick = (positionId: number) => {
    setEditingPositions((prev) => {
      const indexToRemove = prev.findIndex((p) => p.positionId === positionId);

      // Remove both position and input value
      const newPositions = prev.filter((p) => p.positionId !== positionId);
      const newInputValues = [...inputValues];
      newInputValues.splice(indexToRemove, 1);

      setInputValues(newInputValues);
      return newPositions;
    });
  };

  useEffect(() => {
    setFuturePositions(communityMembers);
  }, [communityMembers]);

  return (
    <Container>
      <div className="flex flex-col my-16 gap-6 p-6 bg-[var(--background-color)] text-[var(--accent-color)]">
        <h2 className="text-2xl font-bold text-[var(--accent-color)]">
          Community Settings
        </h2>

        <SettingsSmallNav
          communityId={id}
          pathname={`/communities/${id}/settings/positions`}
        />

        <div className="flex flex-col gap-6">
          {/* Action Buttons */}
          <div className="flex justify-end items-center">
            <div className="flex gap-4">
              {!isEditing && isUserAdmin && (
                <button
                  onClick={handleEditClick}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  <FontAwesomeIcon icon={faEdit} size="lg" />
                </button>
              )}
              {isEditing && (
                <>
                  <button
                    onClick={handleSaveClick}
                    disabled={errorMessage !== null}
                    className="bg-green-500 text-white rounded-full w-10 aspect-square flex items-center justify-center hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <FontAwesomeIcon icon={faCheck} size="lg" />
                  </button>

                  <button
                    onClick={handleUndoClick}
                    className="bg-orange-500 text-white rounded-full w-10 aspect-square flex items-center justify-center hover:bg-orange-600 ml-2"
                  >
                    <FontAwesomeIcon icon={faUndo} size="lg" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-sm font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-800 shadow-md rounded-md">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr className="bg-[var(--button-hover-background-color)] text-white">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider "
                  >
                    Freelancer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider "
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider "
                  >
                    Financial %
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider "
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <Suspense fallback={<Spinner />}>
                <tbody>
                  {(isEditing ? editingPositions : futurePositions).map(
                    (item: RoleAndPosition, index) => (
                      <tr
                        key={index}
                        className="border-b border-[var(--border-color)]"
                      >
                        <td className="px-6 py-4 whitespace-nowrap align-top">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              <Image
                                src={
                                  item.nameAndPicture
                                    ?.freelancerProfilePicture ||
                                  "/images/userprofile.jpg"
                                }
                                alt={item.nameAndPicture?.name || "image"}
                                className="rounded-full object-cover"
                                fill
                                sizes="2.5rem"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {item.nameAndPicture?.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">
                            {item.nameAndPicture?.position}
                          </div>
                          {item.nameAndPicture?.admin && (
                            <div className="text-xs text-gray-500 dark:text-gray-300">
                              Admin
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              min={0}
                              max={100}
                              type="number"
                              value={inputValues[index]}
                              onChange={(e) =>
                                handlePercentChange(index, e.target.value)
                              }
                              className="w-20 px-2 py-1 rounded bg-[var(--hover-color)]"
                            />
                          ) : (
                            <div className="text-sm ">
                              {item.futurePercentage}%
                              {!isEditing &&
                                item.futurePercentage !==
                                  item.currentPercentage && (
                                  <span className="relative inline-block ml-2 group">
                                    <FontAwesomeIcon
                                      icon={faCircleInfo}
                                      className="text-gray-500 group-hover:text-gray-600"
                                    />
                                    <div
                                      className="
                                      absolute left-full top-1/2 transform -translate-y-1/2
                                      bg-gray-800 text-white text-xs rounded px-2 py-1
                                      whitespace-nowrap opacity-0 group-hover:opacity-100
                                      transition-opacity duration-200 ml-2
                                      pointer-events-none                          
                                    "
                                    >
                                      Current allocation:{" "}
                                      {item.currentPercentage}%
                                    </div>
                                  </span>
                                )}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm flex justify-between items-center gap-2">
                          <span>{item.description}</span>
                          {isEditing && !item.nameAndPicture.admin && (
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-gray-400 hover:text-gray-600 cursor-pointer"
                              onClick={() => handleDeleteClick(item.positionId)}
                            />
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Suspense>
            </table>
          </div>

          {isEditing && (
            <button
              onClick={() => setShowAddPosition(true)}
              className="w-fit bg-[var(--btn-color)] px-4 py-2 rounded-lg"
            >
              + Add Position
            </button>
          )}
        </div>
      </div>

      {showAddPosition && (
        <AddPositionForm
          onClose={() => setShowAddPosition(false)}
          onPositionAdded={(newPosition: UpdatePositionRequest) => {
            // Create RoleAndPosition object
            const newRolePosition: RoleAndPosition = {
              positionId: 0,
              nameAndPicture: {
                position: newPosition.positionName,
                name: "New Member", // Default name (adjust as needed)
                freelancerProfilePicture: "/images/userprofile.jpg", // Default image
              },
              futurePercentage: newPosition.financialPercent,
              currentPercentage: 0, // New positions start with 0 current %
              description: newPosition.description,
            };

            setEditingPositions((prev) => [...prev, newRolePosition]);
            setInputValues((prev) => [
              ...prev,
              newPosition.financialPercent.toString(),
            ]);
          }}
        />
      )}
    </Container>
  );
}

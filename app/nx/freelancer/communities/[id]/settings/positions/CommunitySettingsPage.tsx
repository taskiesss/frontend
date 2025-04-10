/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState } from "react";
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
  RoleAndPosition,
  UpdatePositionRequest,
} from "@/app/_types/CommunitySettings";

import {
  getCommunityRolesAndPositions,
  updateCommunityPositions,
} from "@/app/_lib/CommunityProfile/settings";
import Button from "@/app/_components/common/button";

type Props = {
  rolesAndPositions: RoleAndPosition[];
  id: string;
  token?: string; // Token passed from server component for API calls
};

export default function CommunitySettingsPage({
  rolesAndPositions: initialPositions,
  id,
  token,
}: Props) {
  // Keep original positions reference untouched
  const [currentPositions, setCurrentPositions] =
    useState<RoleAndPosition[]>(initialPositions);
  const [futurePositions, setFuturePositions] =
    useState<RoleAndPosition[]>(initialPositions);

  // Working copy for edits that only gets applied on save
  const [editingPositions, setEditingPositions] = useState<RoleAndPosition[]>(
    []
  );

  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Input values for display only
  const [inputValues, setInputValues] = useState<string[]>([]);

  const handleEditClick = () => {
    // Create deep copies for editing
    const positionsCopy = JSON.parse(JSON.stringify(futurePositions));
    setEditingPositions(positionsCopy);

    // Initialize input values from current positions
    setInputValues(
      currentPositions.map((pos) => pos.futurePercentage.toString())
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

      const newPositions: RoleAndPosition[] =
        await getCommunityRolesAndPositions(id, token);

      setFuturePositions(newPositions);
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
              {!isEditing && (
                <button
                  onClick={handleEditClick}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  <FontAwesomeIcon icon={faEdit} size="lg" />
                </button>
              )}
              {isEditing && (
                <>
                  <Button
                    onClick={handleSaveClick}
                    disabled={errorMessage !== null}
                  >
                    <FontAwesomeIcon icon={faCheck} size="lg" />
                  </Button>
                  <Button onClick={handleUndoClick}>
                    <FontAwesomeIcon icon={faUndo} size="lg" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-800 shadow-md rounded-md">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Freelancer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Financial %
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {(isEditing ? editingPositions : futurePositions).map(
                  (item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <Image
                              src={
                                item.nameAndPicture?.freelancerProfilePicture ||
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
                            className="w-20 px-2 py-1 rounded dark:bg-gray-700 "
                          />
                        ) : (
                          <div className="text-sm text-gray-500 dark:text-gray-300">
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
                                    Current allocation: {item.currentPercentage}
                                    %
                                  </div>
                                </span>
                              )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 flex justify-between items-center gap-2">
                        <span>{item.description}</span>
                        {isEditing && (
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
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
}

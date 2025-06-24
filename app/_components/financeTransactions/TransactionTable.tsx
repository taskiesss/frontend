/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link"; // Import Next.js Link component
import { getTransactions } from "@/app/_lib/FinanceAPI/transactionsAPI";
import ProtectedPage from "../common/ProtectedPage";
import { transactions } from "@/app/_types/Finance";
import { Pagination } from "../common/Pagination";
import {
  capitalizeFirstLetter,
  formatDayMonthToString,
} from "@/app/_helpers/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

type Props = {
  role?: string;
  filter: {
    type: string;
    dates: {
      startDate?: Date | null;
      endDate?: Date | null;
    };
  };
};

function TransactionTable({ filter, role }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const size = 10;

  const queryClient = useQueryClient();
  const token = Cookies.get("token");
  const type = filter.type === "" ? null : filter.type;

  const {
    data,
    isError,
    error,
  }: { data?: transactions; isError: boolean; error: any } = useQuery({
    queryKey: ["TransactionTable", filter, currentPage, size],
    queryFn: () =>
      getTransactions(
        {
          type: type,
          startDate: filter.dates.startDate
            ? new Date(filter.dates.startDate).toISOString().split("T")[0]
            : undefined, // YYYY-MM-DD
          endDate: filter.dates.endDate
            ? new Date(filter.dates.endDate).toISOString().split("T")[0]
            : undefined, // YYYY-MM-DD
          page: currentPage - 1,
          size: size,
        },
        token
      ),
    placeholderData: () => {
      const prevPage = currentPage - 1;
      if (prevPage >= 1) {
        return queryClient.getQueryData([
          "TransactionTable",
          filter,
          prevPage,
          size,
        ]);
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    if (errorMessage === "Forbidden" || errorMessage === "Unauthorized user") {
      return (
        <ProtectedPage message="You are not allowed to do this action. Please log in" />
      );
    }
    return <div>Error loading jobs list: {errorMessage}</div>;
  }

  if (!data) return null;

  const handlePageChange = (page: number, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    setCurrentPage(page);
  };

  console.log("Data:", data); // Debug pagination

  return (
    <div className="w-full px-4">
      <div className="w-full bg-[var(--background-color)] rounded-lg border border-solid border-[var(--border-color)] overflow-hidden shadow-md">
        <table className="border-collapse text-base w-full">
          <thead>
            <tr className="bg-[var(--button-hover-background-color)] text-white">
              <th className="px-6 py-5 text-left text-lg w-1/6 rounded-tl-lg">
                Date
              </th>
              <th className="px-6 py-5 text-left text-lg w-1/12">Type</th>
              <th className="px-6 py-5 text-left text-lg w-1/2">Description</th>
              <th className="px-6 py-5 text-right text-lg w-1/6">Amount</th>
              <th className="px-6 py-5 text-left text-lg w-1/6 rounded-tr-lg">
                Ref ID
              </th>
            </tr>
          </thead>
          <tbody>
            {data.content.length > 0 ? (
              data.content.map((m, i) => (
                <tr
                  key={i}
                  className={`${
                    i === data.content.length - 1
                      ? "rounded-bl-lg rounded-br-lg"
                      : "border-b border-solid border-gray-600"
                  }`}
                >
                  <td className="px-6 py-5 align-top w-1/6  text-lg">
                    {formatDayMonthToString(m.date)}
                  </td>
                  <td className="px-6 py-5 align-top w-1/12 text-lg text-left">
                    {capitalizeFirstLetter(m.type.toLowerCase())}
                  </td>
                  <td className="px-6 py-5 align-top w-1/2 text-lg ">
                    <p className="whitespace-pre-wrap ">
                      {m.description}
                      {"   "}
                      {m?.contractId && (
                        <Link
                          href={
                            role === "client"
                              ? `/nx/client/mycontracts/${m.contractId}`
                              : `/nx/freelancer/mycontracts/${m.contractId}`
                          }
                          className="inline-flex items-center transition-opacity hover:opacity-50"
                        >
                          <FontAwesomeIcon
                            icon={faExternalLinkAlt}
                            className="text-md text-[var(--hover-color)]"
                          />
                        </Link>
                      )}
                    </p>
                  </td>
                  <td className="px-6 py-5 align-top w-1/6 text-lg text-right">
                    $ {m.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-5 align-top w-1/6 text-md text-left overflow-hidden">
                    <p className="truncate w-full" title={m.id}>
                      {m.id}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-5 text-lg text-center text-gray-400"
                >
                  There are no transactions.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data.content.length > 0 && data.totalElements > size && (
        <div className="self-center mt-4">
          <Pagination
            currentPage={currentPage}
            setPageParamter={true}
            totalCount={data.totalElements}
            pageSize={data.size}
            onPageChange={(page: number, event?: React.MouseEvent) =>
              handlePageChange(page, event)
            }
          />
        </div>
      )}
    </div>
  );
}

export default TransactionTable;

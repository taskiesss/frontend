"use client";
import React, { CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// A constant for our ellipsis marker.
const DOTS = "...";

// Helper function to create a range of numbers.
const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export interface UsePaginationProps {
  totalCount: number; // Total number of items
  pageSize: number; // Number of items per page
  siblingCount?: number; // How many pages to show on each side of the current page (default is 1)
  currentPage: number; // The current active page
}

/**
 * Custom hook that calculates the pagination range.
 * It returns an array of numbers and/or DOTS (as string) to render.
 */
export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps): (number | string)[] => {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  // Total numbers to show in pagination (first, last, current, siblings, and two dots)
  const totalPageNumbers = siblingCount + 5;

  // If the number of pages is less than the page numbers we want to show, return range 1..totalPageCount
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  // Calculate left and right sibling index boundaries
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  let paginationRange: (number | string)[] = [];

  if (!shouldShowLeftDots && shouldShowRightDots) {
    // No left dots, but right dots to be shown
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    paginationRange = [...leftRange, DOTS, totalPageCount];
  } else if (shouldShowLeftDots && !shouldShowRightDots) {
    // Left dots to be shown, but no right dots
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(
      totalPageCount - rightItemCount + 1,
      totalPageCount
    );
    paginationRange = [firstPageIndex, DOTS, ...rightRange];
  } else if (shouldShowLeftDots && shouldShowRightDots) {
    // Both left and right dots to be shown
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    paginationRange = [
      firstPageIndex,
      DOTS,
      ...middleRange,
      DOTS,
      lastPageIndex,
    ];
  }

  return paginationRange;
};

export interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

/**
 * Pagination component renders a list of page buttons along with
 * "Previous" and "Next" controls. It uses the usePagination hook
 * to generate a page range that includes ellipsis when needed.
 *
 * This updated version also pushes the new page number into the URL's query parameters.
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  siblingCount = 1,
}) => {
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  // If there are not enough pages to paginate, return null.
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const totalPageCount = Math.ceil(totalCount / pageSize);
  const lastPage = paginationRange[paginationRange.length - 1] as number;

  // This function handles page changes by calling the passed-in onPageChange
  // callback and then pushing the new page number into the URL.
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPageCount) return;
    onPageChange(page);

    // Create a new URLSearchParams object based on the current search params.
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", page.toString());
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const onNext = () => {
    if (currentPage < totalPageCount) {
      handlePageChange(currentPage);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage);
    }
  };

  // Inline styles for demonstration purposes; replace with your CSS or CSS-in-JS solution.
  const styles: Record<string, CSSProperties> = {
    paginationContainer: {
      listStyleType: "none",
      display: "flex",
      padding: "2.5rem 0",
    },
    paginationItem: {
      margin: "0 4px",
      padding: "8px 12px",
      cursor: "pointer",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#ccc",
      borderRadius: "4px",
    },
    disabled: {
      opacity: 0.5,
      pointerEvents: "none",
    },
    selected: {
      backgroundColor: "var(--btn-color)",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "var(--border-color)",
      color: "#fff",
    },
  };

  return (
    <ul className="pagination-container" style={styles.paginationContainer}>
      {/* Previous Button */}
      <li
        className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
        onClick={onPrevious}
        style={{
          ...styles.paginationItem,
          ...(currentPage === 1 ? styles.disabled : {}),
        }}
      >
        Prev
      </li>

      {/* Page Numbers */}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={`dots-${index}`}
              className="pagination-item dots"
              style={styles.paginationItem}
            >
              {DOTS}
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={`pagination-item ${
              pageNumber === currentPage ? "selected" : ""
            }`}
            onClick={() => handlePageChange(Number(pageNumber))}
            style={{
              ...styles.paginationItem,
              ...(pageNumber === currentPage ? styles.selected : {}),
            }}
          >
            {pageNumber}
          </li>
        );
      })}

      {/* Next Button */}
      <li
        className={`pagination-item ${
          currentPage === lastPage ? "disabled" : ""
        }`}
        onClick={onNext}
        style={{
          ...styles.paginationItem,
          ...(currentPage === lastPage ? styles.disabled : {}),
        }}
      >
        Next
      </li>
    </ul>
  );
};

"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "../../common/Pagination";

type Props = { totalElements: number; size: number; page: number };

function PostPagination({ totalElements, size, page }: Props) {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <Pagination
      currentPage={currentPage}
      totalCount={totalElements}
      pageSize={size}
      onPageChange={setCurrentPage}
      setPageParamter={false}
    />
  );
}

export default PostPagination;

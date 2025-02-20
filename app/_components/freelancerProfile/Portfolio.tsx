"use client";

import { useState } from "react";
import { Pagination } from "../common/Pagination";
import PDFPreviewAuto from "./SinglePdfReviewer";

const portfolios = {
  content: [
    {
      portfolioPdf:
        "https://res.cloudinary.com/upwork-fp/image/upload/v1739983878/profile/portfolio/997588759685713920/qgpckh5j4pjelvldnxpp.pdf",
      name: "Mortage Project",
    },
    {
      portfolioPdf:
        "https://res.cloudinary.com/dvds6blan/image/upload/v1739981710/cld-sample-5.jpg",
      name: "Project 2",
    },
    {
      portfolioPdf:
        "https://res.cloudinary.com/dvds6blan/image/upload/v1739981710/cld-sample-5.jpg",
      name: "Project 2",
    },
  ],
  pageable: {
    sort: {
      unsorted: true,
      sorted: true,
      empty: true,
    },
    pageNumber: 0,
    pageSize: 3,
    offset: 0,
    unpaged: true,
  },
  totalElements: 20,
  totalPages: 4,
  size: 10,
  number: 0,
};

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState(1);
  // console.log("current page", currentPage);
  return (
    <div className="flex flex-col">
      <div className="flex gap-10 flex-wrap">
        {portfolios.content.map((p, i) => (
          <PDFPreviewAuto
            key={i}
            fileUrl={p.portfolioPdf}
            ProjectName={p.name}
          />
        ))}
      </div>
      <div className="self-center">
        <Pagination
          currentPage={currentPage}
          totalCount={portfolios.totalElements}
          pageSize={portfolios.size}
          onPageChange={setCurrentPage}
          siblingCount={0}
          setPageParamter={true}
        />
      </div>
    </div>
  );
}

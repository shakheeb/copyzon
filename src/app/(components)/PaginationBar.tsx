import { log } from "console";
import Link from "next/link";
import React from "react";

interface PaginationBarProps {
  currentPgae: number;
  totolPages: number;
}
const PaginationBar = ({ currentPgae, totolPages }: PaginationBarProps) => {
  const maxPage = Math.min(totolPages, Math.max(currentPgae + 4, 10));
  const minPage = Math.max(1, Math.min(currentPgae - 5, maxPage - 9));
  const numberedPageItems: JSX.Element[] = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={"?page=" + page}
        key={page}
        className={`btn join-item ${currentPgae === page ? "btn-active pointer-events-none " : ""}`}
      >
        {page}
      </Link>,
    );
  }

  return (
    <>
      <div className="join hidden sm:block">{numberedPageItems}</div>
      <div className="join block sm:hidden ">
        {currentPgae > 1 && (
          <Link href={"?page=" + (currentPgae - 1)} className="bbtn join-item">
            «
          </Link>
        )}
        <button className="btn join-item pointer-events-none">
          PAGE{" " + currentPgae}
        </button>
        {currentPgae <= totolPages - 1 && (
          <Link href={"?page=" + (currentPgae + 1)} className="bbtn join-item">
            »
          </Link>
        )}
      </div>
    </>
  );
};

export default PaginationBar;

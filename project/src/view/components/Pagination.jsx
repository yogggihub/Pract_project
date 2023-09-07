/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
function Pagination({
  numbers,
  prevPage,
  currentPage,
  nextPage,
  changeCurrentPage,
}) {
  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li className="pageItem">
          <a href="#" className="pageLink" onClick={prevPage} title="Previous">
            «
          </a>
        </li>
        {numbers.map((num, index) => {
          return (
            <li
              className={`pageItem ${currentPage === num ? "active" : ""}`}
              key={index}
            >
              <a
                href="#"
                className="pageItem"
                onClick={() => changeCurrentPage(num)}
                title={num}
              >
                {num}
              </a>
            </li>
          );
        })}
        <li className="pageItem">
          <a href="#" className="pageLink" onClick={nextPage} title="Next">
            »
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;

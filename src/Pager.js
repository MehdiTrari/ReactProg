// Pager.js
import React from "react";
import "./Pager.css";

const Pager = ({ handlePrevious, handleNext, isPreviousDisabled }) => {
  return (
    <div className="pagination-buttons-fixed">
      <button onClick={handlePrevious} disabled={isPreviousDisabled}>
        Précédent
      </button>
      <button onClick={handleNext}>
        Suivant
      </button>
    </div>
  );
};

export default Pager;

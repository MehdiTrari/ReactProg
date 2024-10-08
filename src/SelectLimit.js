// SelectLimit.js
import React from "react";

const SelectLimit = ({ limit, onLimitChange }) => {
  return (
    <select 
      value={limit} 
      onChange={(e) => onLimitChange(Number(e.target.value))} 
      className="limit-select"
    >
      <option value={20}>Taille de la liste</option>
      <option value={1}>1</option>
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
      <option value={-1}>Tous</option>
    </select>
  );
};

export default SelectLimit;

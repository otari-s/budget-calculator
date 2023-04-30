import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
export const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
  const { id, charge, amount } = expense;
  return (
    <>
      <li className="item">
        <div className="info">
          <span className="expense">{charge}</span>
          <span className="amount">${amount}</span>
        </div>
        <div>
          <button
            className="edit-btn"
            aria-label="edit button"
            onClick={() => handleEdit(id)}
          >
            <MdEdit />
          </button>
          <button
            className="clear-btn"
            aria-label="clear button"
            onClick={() => handleDelete(id)}
          >
            <MdDelete />
          </button>
        </div>
      </li>
    </>
  );
};

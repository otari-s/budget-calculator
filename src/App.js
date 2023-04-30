import React, { useState, useEffect } from "react";
import "./App.css";
import { Alert } from "./components/Alert";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { v4 as uuidv4 } from "uuid";

// const initialExpenses = [
//   { id: uuidv4(), charge: "rent", amount: 1600 },
//   { id: uuidv4(), charge: "car payment", amount: 400 },
//   { id: uuidv4(), charge: "credit card bill", amount: 1200 },
// ];
const initialExpenses = localStorage.getItem(`expenses`)
  ? JSON.parse(localStorage.getItem(`expenses`))
  : [];
function App() {
  // *************** state values **************************
  //    all expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState(``);
  // single amount
  const [amount, setAmount] = useState(``);
  //  alert
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);
  // *************** useEffect ******************************
  useEffect(() => {
    console.log(`useEffect`);
    localStorage.setItem(`expenses`, JSON.stringify(expenses));
  }, [expenses]);
  // *************** functionality **************************

  //  handle charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  //  handle amount

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  //  handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  //  handle submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== `` && amount > 0) {
      if (edit) {
        let tempExpense = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpense);
        setEdit(false);
        handleAlert({ type: `success`, text: `item edited` });
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge(``);
      setAmount(``);
    } else {
      // handle alert call
      handleAlert({
        type: `danger`,
        text: `charge cant be empty value and amount value has to be bigger then 0`,
      });
    }
  };
  // clear all items
  const clearItems = () => {
    console.log(`cleared all items`);
    setExpenses([]);
  };

  // handle  delete

  const handleDelete = (id) => {
    const tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: `danger`, text: `item deleted` });
  };
  // handle  edit

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;

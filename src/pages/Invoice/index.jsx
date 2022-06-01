import { deleteInvoice, getInvoice } from "../../data";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import React from "react";

export default function Invoice() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  let invoice = getInvoice(parseInt(params.invoiceId));

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <button onClick={() => {
          deleteInvoice(invoice.number);
          navigate("/invoices" + location.search);
        }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}
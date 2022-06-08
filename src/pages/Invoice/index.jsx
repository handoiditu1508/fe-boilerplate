import { deleteAsync, selectInvoice } from "../../redux/features/invoice/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import React from "react";

export default function Invoice() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  const dispatch = useDispatch();
  const invoice = useSelector(selectInvoice(parseInt(params.invoiceId)));

  return (
    <>
      {!invoice && <p>Not found!</p>}
      {invoice &&
        <main style={{ padding: "1rem" }}>
          <h2>Total Due: {invoice.amount}</h2>
          <p>
            {invoice.name}: {invoice.number}
          </p>
          <p>Due Date: {invoice.due}</p>
          <p>
            <button onClick={() => {
              dispatch(deleteAsync(parseInt(params.invoiceId)));
              navigate("/invoices" + location.search);
            }}
            >
              Delete
            </button>
          </p>
        </main>
      }
    </>
  );
}
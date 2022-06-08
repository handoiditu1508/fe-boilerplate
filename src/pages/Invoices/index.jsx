import { Outlet, useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import { getAsync, selectError, selectInvoices, selectLoading } from "../../redux/features/invoice/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";

import QueryNavLink from "../../components/QueryNavLink";

export default function Invoices() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const invoices = useSelector(selectInvoices);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getAsync());
  }, [dispatch]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>error: {error}</p>}
      {!loading && <div style={{ display: "flex" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
        >
          <input value={searchParams.get("filter") || ""}
            onChange={(event) => {
              let filter = event.target.value;
              if (filter) {
                setSearchParams({ filter });
              } else {
                setSearchParams({});
              }
            }}
          />
          {invoices
            .filter((invoice) => {
              const filter = searchParams.get('filter');
              if (!filter) return true;
              let name = invoice.name.toLowerCase();
              return name.startsWith(filter.toLowerCase());
            })
            .map((invoice) => (
              <QueryNavLink
                style={({ isActive }) => {
                  return {
                    display: "block",
                    margin: "1rem 0",
                    color: isActive ? "red" : "green"
                  }
                }}
                to={`/invoices/${invoice.id}`}
                key={invoice.id}
              >
                {invoice.name}
              </QueryNavLink>
            ))}
        </nav>
        <Outlet />
      </div>}
    </>
  );
}
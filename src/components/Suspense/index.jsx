import React from "react";

export default function Suspense({children}){
  return <React.Suspense fallback="Loading...">{children}</React.Suspense>
}
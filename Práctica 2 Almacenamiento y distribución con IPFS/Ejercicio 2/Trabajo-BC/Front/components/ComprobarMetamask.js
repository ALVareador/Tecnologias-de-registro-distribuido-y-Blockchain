'use client'
import { useEffect, useState } from "react";
import ErrorMetamask from "./ErrorMetamask";

export default function ComprobarMetamask({ children }) {
  const [metamask, setMetamask] = useState("loading");

  useEffect(() => {
    const { ethereum } = window;
    setMetamask(ethereum ? true : false);
  }, []);

  return metamask === false ? (
    <ErrorMetamask />
  ) : metamask === "loading" ? (
    <div className="h-screen grid place-content-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  ) : (
    children
  );
}

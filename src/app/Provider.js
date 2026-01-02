"use client";


import useLenis from "@/hooks/useLenies";

export default function Provider({ children }) {

  useLenis();

  return (
    <>

      {children}

    </>
  );
}

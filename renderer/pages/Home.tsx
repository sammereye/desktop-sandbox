import React from "react";
import { useHookstate } from "@hookstate/core";
import { COUNT } from "../state/number";

export function Home() {
  const count = useHookstate(COUNT);

  return (
    <div className="mt-2">
      <h1>This is the home page</h1>
      <p>Count: { count.get() }</p>
      <button 
        type="button" 
        className="rounded-md bg-blue-600 mt-3 px-3 py-2 text-sm font-semibold text-white shadow-sm"
        onClick={() => { count.set(count.get() + 1) }}
      >
        Add to Count
      </button>
    </div>
  )
}
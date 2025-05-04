// hooks/useDebouncedValue.js
import { useState, useEffect } from "react";

export function useDebouncedValue(callback, deps = [], delay = 500) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler);
  }, [...deps, delay]);
}

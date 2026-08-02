"use client";

import { useEffect } from "react";

const RELOAD_FLAG_KEY = "chunk-error-reloaded";

function isChunkLoadError(error) {
  if (!error) return false;
  const message = typeof error === "string" ? error : error.message ?? "";
  return error.name === "ChunkLoadError" || /Loading chunk [\w.-]+ failed/i.test(message);
}

export default function ChunkErrorReloader() {
  useEffect(() => {
    const reloadOnce = () => {
      if (sessionStorage.getItem(RELOAD_FLAG_KEY)) return;
      sessionStorage.setItem(RELOAD_FLAG_KEY, "1");
      window.location.reload();
    };

    const handleError = (event) => {
      if (isChunkLoadError(event.error)) reloadOnce();
    };

    const handleRejection = (event) => {
      if (isChunkLoadError(event.reason)) reloadOnce();
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    // Give the current page a chance to load cleanly before allowing another
    // reload attempt for a future, unrelated chunk error.
    const clearFlagTimer = setTimeout(() => {
      sessionStorage.removeItem(RELOAD_FLAG_KEY);
    }, 10000);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
      clearTimeout(clearFlagTimer);
    };
  }, []);

  return null;
}

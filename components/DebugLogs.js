import { useEffect, useState } from "react";

let original = {
  log: console.log,
  error: console.error,
};

let patched = false;

export const DebugLogs = () => {
  const [logs, setLogs] = useState([]);

  const isSearch =
    typeof window !== "undefined" && window.location.search === "?debug=true";

  useEffect(() => {
    if (!isSearch) return;

    if (patched === false) {
      patched = true;
      console.log = (...args) => {
        setTimeout(() => {
          setLogs((logs) => [...logs, args]);
          original.log(...args);
        });
      };
      console.error = (...args) => {
        setTimeout(() => {
          setLogs((logs) => [...logs, args]);
          original.error(...args);
        });
      };
    }

    return () => {
      patched = false;
      console.log = original.log;
      console.error = original.error;
    };
  }, [isSearch]);

  return (
    <>
      {logs.map((log, i) => (
        <div key={i}>{JSON.stringify(log)}</div>
      ))}
    </>
  );
};

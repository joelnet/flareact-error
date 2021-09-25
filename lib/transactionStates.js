export const TX_STATES = {
  IDLE: "IDLE",
  SIGN: "SIGN",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export const isDone = (state) => state === "SUCCESS" || state === "ERROR";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function invariant(condition: any, message?: string) {
  if (condition) throw new Error(message);
  else return;
}

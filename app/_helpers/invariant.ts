function invariant(condition: any, message?: string) {
  if (condition) return;
  throw new Error(message);
}

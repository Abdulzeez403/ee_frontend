import { startOfWeek, addDays, isSameDay, format } from "date-fns";

const today = new Date();
const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // Sunday start

export const weekDays = Array.from({ length: 7 }).map((_, i) =>
  addDays(weekStart, i)
);

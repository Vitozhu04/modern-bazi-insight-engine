import { equationOfTime } from "./equationOfTime.js";

export const trueSolarTime = (date: Date, longitude: number): Date => {
  const equationMinutes = equationOfTime(date);
  const longitudeCorrection = 4 * longitude;
  const timeOffsetMinutes = equationMinutes + longitudeCorrection;

  return new Date(date.getTime() + timeOffsetMinutes * 60000);
};

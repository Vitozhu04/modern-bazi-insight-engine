const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getDayOfYear = (date: Date) => {
  const year = date.getUTCFullYear();
  const start = Date.UTC(year, 0, 1);
  const current = Date.UTC(year, date.getUTCMonth(), date.getUTCDate());
  return Math.floor((current - start) / 86400000) + 1;
};

const getUtcHourFraction = (date: Date) =>
  date.getUTCHours() +
  date.getUTCMinutes() / 60 +
  date.getUTCSeconds() / 3600 +
  date.getUTCMilliseconds() / 3600000;

export const equationOfTime = (date: Date): number => {
  const year = date.getUTCFullYear();
  const dayOfYear = getDayOfYear(date);
  const hourFraction = getUtcHourFraction(date);
  const daysInYear = isLeapYear(year) ? 366 : 365;
  const gamma =
    (2 * Math.PI / daysInYear) * (dayOfYear - 1 + (hourFraction - 12) / 24);

  return (
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma))
  );
};

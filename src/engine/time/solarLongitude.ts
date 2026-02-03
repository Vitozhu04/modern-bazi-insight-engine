const normalizeAngle = (degrees: number) => {
  const normalized = degrees % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const julianDay = (date: Date) => {
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();

  if (month <= 2) {
    month += 12;
    year -= 1;
  }

  const a = Math.floor(year / 100);
  const b = 2 - a + Math.floor(a / 4);
  const dayFraction = (hour + minute / 60 + second / 3600) / 24;

  const jd =
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day +
    b -
    1524.5 +
    dayFraction;

  return jd;
};

export const solarLongitude = (date: Date): number => {
  const jd = julianDay(date);
  const t = (jd - 2451545.0) / 36525;

  let meanLongitude = 280.46646 + 36000.76983 * t + 0.0003032 * t * t;
  meanLongitude = normalizeAngle(meanLongitude);

  let meanAnomaly = 357.52911 + 35999.05029 * t - 0.0001537 * t * t;
  meanAnomaly = normalizeAngle(meanAnomaly);

  const meanAnomalyRad = toRadians(meanAnomaly);
  const equationOfCenter =
    (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(meanAnomalyRad) +
    (0.019993 - 0.000101 * t) * Math.sin(2 * meanAnomalyRad) +
    0.000289 * Math.sin(3 * meanAnomalyRad);

  let trueLongitude = meanLongitude + equationOfCenter;
  trueLongitude = normalizeAngle(trueLongitude);

  const omega = 125.04 - 1934.136 * t;
  const apparentLongitude =
    trueLongitude - 0.00569 - 0.00478 * Math.sin(toRadians(omega));

  return normalizeAngle(apparentLongitude);
};

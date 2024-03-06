/**
 * This function parses a duration string or number and returns its value in milliseconds.
 *
 * @param {string | number} duration - The duration to parse. This can be a number (representing milliseconds)
 *                                     or a string in the format `/(\d+)(ms|s|m|h|d|w)/` where the first group is a number
 *                                     and the second group is a unit (`ms` for milliseconds, `s` for seconds, `m` for minutes,
 *                                     `h` for hours, `d` for days, and `w` for weeks).
 * @returns {number} The parsed duration in milliseconds.
 * @throws {Error} Throws an error if the duration string is not in the expected format.
 */
export default function parseDuration(duration: string | number): number {
  if (typeof duration === 'number') {
    return duration;
  }
  const units = {
    ms: 1,
    s: 1000,
    m: 60000,
    h: 3600000,
    d: 86400000,
    w: 604800000,
  };

  const match = /^(\d+)(ms|s|m|h|d|w)$/.exec(duration);
  if (!match) {
    throw new Error('Invalid duration format');
  }
  const value = Number(match[1]);
  const unit = match[2];

  return value * units[unit];
}

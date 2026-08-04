export function secondsToTime(rawSeconds: number, colons?: true, doubleZeroInMinute?: true, day?: true): string {
  rawSeconds = Math.round(rawSeconds);

  const days = day ? Math.floor(rawSeconds / 86400) : 0;
  const hours = Math.floor((rawSeconds - days * 86400) / 3600);
  const minutes = Math.floor((rawSeconds - hours * 3600) / 60);
  const seconds = rawSeconds - hours * 3600 - minutes * 60;

  let output = "";

  if (days > 0) output += `${days}d `;
  if (hours > 0) output += `${hours}${colons ? ":" : "h "}`;
  if (minutes < 10 && doubleZeroInMinute) output += "0";
  output += minutes;
  output += colons ? ":" : "m ";
  if (seconds < 10) output += "0";
  output += seconds;
  if (!colons) output += "s";

  return output;
}

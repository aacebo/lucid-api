export function bytesToString(bytes: number) {
  const units = ['KB', 'MB', 'GB', 'TB'];
  let i = -1;
  let size = bytes;

  while (size >= 1024) {
    size /= 1024;
    i++;
  }

  return `${size.toFixed(1)}${units[i] ? units[i] : 'B'}`;
}

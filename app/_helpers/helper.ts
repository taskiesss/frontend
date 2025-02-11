/* eslint-disable @typescript-eslint/no-unused-vars */
export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Posted now';
  }

  const intervals: { [key: string]: [number, string] } = {
    year: [31536000, 'year'],
    month: [2592000, 'month'],
    week: [604800, 'week'],
    day: [86400, 'day'],
    hour: [3600, 'hour'],
    minute: [60, 'minute'],
  };

  for (const [unit, [seconds, label]] of Object.entries(intervals)) {
    const count = Math.floor(diffInSeconds / seconds);
    if (count >= 1) {
      return `Posted ${count} ${label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'Posted a long time ago';
}

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

export function formatDateString(dateString: string) {
  const date = new Date(dateString);
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(undefined, dateOptions);
}

export const getProjectLength = (length: string): string => {
  switch (length) {
    case '_less_than_1_month':
      return 'Less than 1 month';
    case '_1_to_3_months':
      return '1 to 3 months';
    case '_3_to_6_months':
      return '3 to 6 months';
    case '_more_than_6_months':
      return 'More than 6 months';
    default:
      return '';
  }
};

export const getExperienceLevel = (level: string): string => {
  switch (level) {
    case 'entry_level':
      return 'Entry Level';
    case 'intermediate':
      return 'Intermediate';
    case 'expert':
      return 'Expert';
    default:
      return '';
  }
};

export const getReverseExperienceLevel = (level: string): string => {
  switch (level) {
    case 'Entry Level':
      return 'entry_level';
    case 'Intermediate':
      return 'intermediate';
    case 'Expert':
      return 'expert';
    default:
      return '';
  }
};

export function formatYearToString(dateString: string): string {
  const date = new Date(dateString);
  // Format the date to show the full month name and year
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

export function formatDayMonthToString(dateString: string): string {
  const date = new Date(dateString);
  // Format the date to show the day, full month name, and year
  return date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

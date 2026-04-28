export const formatNewsDate = (dateString: string): string => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(new Date(dateString));

  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value || '';

  return `${getPart('month')}/${getPart('day')}/${getPart(
    'year',
  )} at ${getPart('hour')}:${getPart('minute')}${getPart(
    'dayPeriod',
  ).toLowerCase()} ET`;
};

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { date } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function getDateTimeString(date: Date) {
  return date.toLocaleString();
}

export const getTimestamp = (date: Date) => {
  const now = new Date();
  // console.log('date', date.toString());
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'seconds', seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);

    if (interval >= 1) {
      // console.log(`interval ${interval} >= 1 for ${unit.label}`);
      return `${interval} ${unit.label}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

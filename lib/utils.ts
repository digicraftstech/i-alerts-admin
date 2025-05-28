import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export const getTimeInterval = (fromDate: Date, toDate: Date) => {
  // console.log('date', date.toString());

  if (!toDate) return 'Not addressed yet.';

  const secondsAgo = Math.floor((toDate.getTime() - fromDate.getTime()) / 1000);

  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);

    if (interval >= 1) {
      // console.log(`interval ${interval} >= 1 for ${unit.label}`);
      return `${interval} ${unit.label}${interval > 1 ? 's' : ''}`;
    }
  }
  return '< 1 second';
};

// Returns the exact difference between two dates in days, hours, minutes, or seconds
// export const getExactTimeDifference = (toDate: Date, fromDate: Date) => {
//   const diffMs = Math.abs(toDate.getTime() - fromDate.getTime());

//   const seconds = Math.floor(diffMs / 1000);
//   const minutes = Math.floor(diffMs / (1000 * 60));
//   const hours = Math.floor(diffMs / (1000 * 60 * 60));
//   const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//   if (days >= 1) {
//     return `${days} day${days > 1 ? 's' : ''}`;
//   } else if (hours >= 1) {
//     return `${hours} hour${hours > 1 ? 's' : ''}`;
//   } else if (minutes >= 1) {
//     return `${minutes} minute${minutes > 1 ? 's' : ''}`;
//   } else {
//     return `${seconds} second${seconds !== 1 ? 's' : ''}`;
//   }
// };

export function toBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export const getExactTimeDifference = (toDate: Date, fromDate: Date) => {
  let diffMs = Math.abs(toDate.getTime() - fromDate.getTime());

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  diffMs -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diffMs / (1000 * 60));
  diffMs -= minutes * (1000 * 60);

  const seconds = Math.floor(diffMs / 1000);

  // const parts = [];
  // if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
  // if (hours > 0) parts.push(`${hours} hr${hours > 1 ? 's' : ''}`);
  // if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);
  // if (seconds > 0 || parts.length === 0)
  //   parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);

  const parts = [];
  if (days > 0) parts.push(`${days}`);
  if (hours > 0) parts.push(`${hours}`);
  if (minutes > 0) parts.push(`${minutes}`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}`);

  return parts.join(':').replace(/,([^,]*)$/, ' and$1');
};

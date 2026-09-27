import { format } from 'date-fns';

/**
 * Formats a local JavaScript Date object into an ISO-like string for backend APIs
 * without shifting the date backwards or forwards due to timezone offsets.
 * 
 * Example: If a user selects Oct 2nd (midnight local time in Nepal +05:45), 
 * standard `date.toISOString()` returns '2026-10-01T18:15:00.000Z'.
 * This function extracts the local calendar date and returns '2026-10-02T00:00:00Z'.
 * 
 * @param date - The local Javascript Date object
 * @returns Formatted string locked to the selected calendar day
 */
export function formatLocalToUTCDate(date: Date | undefined | null): string {
  if (!date) return "";
  
  // date-fns format extracts the local year, month, and day.
  // We append T00:00:00Z to satisfy the strict backend schema.
  return format(date, "yyyy-MM-dd'T'00:00:00'Z'");
}

/**
 *  - Add Days
 * @param date
 * @param days
 * @returns
 */
export function addDays(date: string, days: number): string {
  return new Date(new Date(date).getTime() + days * 86_400_000).toISOString();
}

import * as dayjs from 'dayjs';

export function formatDateTime(inputValue: Date): string {
  return dayjs(inputValue).format('DD/MM/YYYY');
}

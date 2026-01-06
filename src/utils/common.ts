import moment from 'moment-hijri';

moment.locale('en-us');

export function formatDate(rawDate: Date): string {
  const date = moment(rawDate);
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function formatHijri(rawDate: Date, date_shift?: number): string {
  const date = moment(rawDate);
  if (date_shift) {
    date.add(date_shift, 'iDate');
  }
  const year = date.iYear();
  const month = date.iMonth() + 1;
  const day = date.iDate();
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function filterTags(tags?: string[]): string[] {
  return (tags || []).filter((tag) => !['posts', 'dunyā', 'dīn'].includes(tag));
}

export function tagsOnly(tags?: string[]): string[] {
  return (tags || []).filter((tag) => !['posts', 'all'].includes(tag));
}

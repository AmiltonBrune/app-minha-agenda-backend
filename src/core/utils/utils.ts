import * as crypto from 'crypto';
import * as dayjs from 'dayjs';

export const generateRandomString = (length: number) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

export const generateRamndomNumber = (length: number) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
  );
};

export const compareDate = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return d1.getTime() > d2.getTime();
};

export const formatDate = (date: Date) => {
  return dayjs(date).format('DD/MM/YYYY');
};

export const formatHours = (date: Date) => {
  return dayjs(date).format('HH:mm');
};

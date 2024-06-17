import { v4 as uuidv4 } from 'uuid';

export const generateNumericID = (): number => {
  const uuid = uuidv4();
  const numericId = parseInt(uuid.split('-').join('').slice(0, 15), 16); // Convert part of the UUID to a number
  return numericId;
};

export const formatDate = (dateString: string, locale: string = 'en-US') => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

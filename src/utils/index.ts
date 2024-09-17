import { format, isValid } from 'date-fns';

export const DATE = 'MMM dd yyyy';
export const TIME = 'hh:mm a';

export const TIME_DATE = `${TIME} ${DATE}`;

export const formatDate = (
	dateString?: string | null,
	dateFormat = DATE,
): string => {
	if (!dateString) return '';

	const date = new Date(dateString);
	return isValid(date) ? format(date, dateFormat) : '';
};

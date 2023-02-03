import { DocumentCallParamerters } from './types';

const getKeyValue = (key: string | number, value: string | number) =>
	`${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

const parseQueryString = (obj: { [key: string | number]: string | number }) => {
	const keyValuePairs = [];
	for (const key in obj) {
		keyValuePairs.push(getKeyValue(key, obj[key]));
	}
	return keyValuePairs.join('&');
};

export const stringifyArray = (array: string[]) =>
	'[' + array.map(field => `"${field}"`).join(',') + ']';

export const stringifyObject = (object: { [key: string]: string }) =>
	JSON.stringify(object);

export function getQueryString(parameters: DocumentCallParamerters): string {
	const queryParts: { [key: string]: string } = {};

	for (const [key, value] of Object.entries(parameters)) {
		if (Array.isArray(value)) queryParts[key] = stringifyArray(value);
		else if (typeof value === 'object')
			queryParts[key] = stringifyObject(value);
		else if (typeof value === 'string') queryParts[key] = value;
	}

	return parseQueryString(queryParts);
}

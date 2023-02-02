import getApiClient from './api';

const FrappeClient = (
	baseUrl: string,
	getHeaders: () => Promise<HeadersInit> = () => Promise.resolve({}),
) => {
	const verifiedURL = new URL(baseUrl).href;
	return {
		...getApiClient(verifiedURL, getHeaders),
	};
};

export { FrappeClient, getApiClient };

import getApiClient from './api';

const FrappeClient = (baseUrl: string) => {
	const verifiedURL = new URL(baseUrl).href;
	return {
		...getApiClient(verifiedURL),
	};
};

export { FrappeClient, getApiClient };

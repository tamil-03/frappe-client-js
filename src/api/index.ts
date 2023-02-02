import getMethodClient from './method';
import getResourceClient from './resource';

const getApiClient = (
	baseUrl: string,
	getHeaders: () => Promise<HeadersInit> = () => Promise.resolve({}),
) => ({
	method: getMethodClient(baseUrl, getHeaders),
	resource: getResourceClient(baseUrl, getHeaders),
});

export default getApiClient;

import getMethodClient from './method';
import getResourceClient from './resource';

const getApiClient = (baseUrl: string) => ({
	method: getMethodClient(baseUrl),
	resource: getResourceClient(baseUrl),
});

export default getApiClient;

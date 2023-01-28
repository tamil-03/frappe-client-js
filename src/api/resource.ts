import {
	DocumentCallParamerters,
	ResourceApiParameters,
} from '../utility/types';
import apiClient from './base';

const getMethodCall =
	(baseUrl: string, func: Function) =>
	async (
		endpoint: string,
		name?: string,
		parameters: DocumentCallParamerters = {},
		body: Object = {},
		headers: HeadersInit = {},
	) => {
		const params: ResourceApiParameters = {
			baseUrl,
			path: 'api/resource',
			endpoint,
			name,
			parameters,
		};
		const options: RequestInit = { body: JSON.stringify(body), headers };
		return await func(params, options);
	};

const getResource = (baseUrl: string) => ({
	get: getMethodCall(baseUrl, apiClient.get),
	post: getMethodCall(baseUrl, apiClient.post),
	put: getMethodCall(baseUrl, apiClient.put),
	delete: getMethodCall(baseUrl, apiClient.delete),
});

export default getResource;

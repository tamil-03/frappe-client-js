import { MethodApiParameters } from '../utility/types';
import apiClient from './base';

const getMethodCall =
	(baseUrl: string, func: Function) =>
	async (endpoint: string, args: Object, headers: HeadersInit = {}) => {
		const params: MethodApiParameters = {
			baseUrl,
			path: 'api/method',
			endpoint,
			parameters: func === apiClient.get ? args : undefined,
		};
		const options: RequestInit = {
			body: JSON.stringify(func !== apiClient.get ? args : undefined),
			headers,
		};
		return await func(params, options);
	};

const getMethodClient = (baseUrl: string) => ({
	get: getMethodCall(baseUrl, apiClient.get),
	post: getMethodCall(baseUrl, apiClient.post),
	put: getMethodCall(baseUrl, apiClient.put),
	delete: getMethodCall(baseUrl, apiClient.delete),
});

export default getMethodClient;

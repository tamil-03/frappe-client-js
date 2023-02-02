import { FrappeResponse, MethodApiParameters } from '../utility/types';
import apiClient, { ApiCall } from './base';

const getMethodCall =
	(baseUrl: string, func: ApiCall) =>
	async (
		endpoint: string,
		args: Object,
		headers: HeadersInit = {},
	): Promise<FrappeResponse> => {
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

const getMethodClient = (
	baseUrl: string,
): {
	[key: string]: (
		endpoint: string,
		args: Object,
		headers: HeadersInit,
	) => Promise<FrappeResponse>;
} => ({
	get: getMethodCall(baseUrl, apiClient.get),
	post: getMethodCall(baseUrl, apiClient.post),
	put: getMethodCall(baseUrl, apiClient.put),
	delete: getMethodCall(baseUrl, apiClient.delete),
});

export default getMethodClient;

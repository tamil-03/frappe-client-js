import { FrappeResponse, MethodApiParameters } from '../utility/types';
import apiClient, { ApiCall } from './base';

const getMethodCall =
	(baseUrl: string, func: ApiCall, getHeaders: () => Promise<HeadersInit>) =>
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
			headers: { ...(await getHeaders()), ...headers },
		};
		return await func(params, options);
	};

const getMethodClient = (
	baseUrl: string,
	getHeaders: () => Promise<HeadersInit>,
): {
	[key: string]: (
		endpoint: string,
		args: Object,
		headers?: HeadersInit,
	) => Promise<FrappeResponse>;
} => ({
	get: getMethodCall(baseUrl, apiClient.get, getHeaders),
	post: getMethodCall(baseUrl, apiClient.post, getHeaders),
	put: getMethodCall(baseUrl, apiClient.put, getHeaders),
	delete: getMethodCall(baseUrl, apiClient.delete, getHeaders),
});

export default getMethodClient;

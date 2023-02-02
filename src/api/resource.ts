import {
	DocumentCallParamerters,
	FrappeResponse,
	ResourceApiParameters,
} from '../utility/types';
import apiClient, { ApiCall } from './base';

const getMethodCall =
	(baseUrl: string, func: ApiCall, getHeaders: () => Promise<HeadersInit>) =>
	(endpoint: string) =>
	async (
		name?: string,
		parameters: DocumentCallParamerters = {},
		body: Object = {},
		headers?: HeadersInit,
	): Promise<FrappeResponse> => {
		const params: ResourceApiParameters = {
			baseUrl,
			path: 'api/resource',
			endpoint,
			name,
			parameters,
		};
		const options: RequestInit = {
			body: JSON.stringify(body),
			headers: { ...(await getHeaders()), ...headers },
		};
		return await func(params, options);
	};

const getResourceClient =
	(baseUrl: string, getHeaders: () => Promise<HeadersInit>) =>
	(endpoint: string) => ({
		getList: (
			parameters: DocumentCallParamerters = {},
			headers?: HeadersInit,
		): Promise<FrappeResponse> =>
			getMethodCall(baseUrl, apiClient.get, getHeaders)(endpoint)(
				undefined,
				parameters,
				undefined,
				headers,
			),
		getDoc: (
			name: string,
			parameters: DocumentCallParamerters = {},
			headers?: HeadersInit,
		): Promise<FrappeResponse> =>
			getMethodCall(baseUrl, apiClient.get, getHeaders)(endpoint)(
				name,
				parameters,
				undefined,
				headers,
			),
		createDoc: (
			body: Object = {},
			headers?: HeadersInit,
		): Promise<FrappeResponse> =>
			getMethodCall(baseUrl, apiClient.post, getHeaders)(endpoint)(
				undefined,
				undefined,
				body,
				headers,
			),
		updateDoc: (
			name: string,
			body: Object = {},
			headers?: HeadersInit,
		): Promise<FrappeResponse> =>
			getMethodCall(baseUrl, apiClient.put, getHeaders)(endpoint)(
				name,
				undefined,
				body,
				headers,
			),
		deleteDoc: (
			name: string,
			body: Object = {},
			headers?: HeadersInit,
		): Promise<FrappeResponse> =>
			getMethodCall(baseUrl, apiClient.delete, getHeaders)(endpoint)(
				name,
				undefined,
				body,
				headers,
			),
	});

export default getResourceClient;

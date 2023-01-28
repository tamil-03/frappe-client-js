import {
	DocumentCallParamerters,
	ResourceApiParameters,
} from '../utility/types';
import apiClient from './base';

const getMethodCall =
	(baseUrl: string, func: Function) =>
	(endpoint: string) =>
	async (
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

const getResourceClient = (baseUrl: string) => (endpoint: string) => ({
	getList: (
		parameters: DocumentCallParamerters = {},
		headers: HeadersInit = {},
	) =>
		getMethodCall(baseUrl, apiClient.get)(endpoint)(
			undefined,
			parameters,
			undefined,
			headers,
		),
	getDoc: (
		name: string,
		parameters: DocumentCallParamerters = {},
		headers: HeadersInit = {},
	) =>
		getMethodCall(baseUrl, apiClient.get)(endpoint)(
			name,
			parameters,
			undefined,
			headers,
		),
	createDoc: (body: Object = {}, headers: HeadersInit = {}) =>
		getMethodCall(baseUrl, apiClient.post)(endpoint)(
			undefined,
			undefined,
			body,
			headers,
		),
	updateDoc: (name: string, body: Object = {}, headers: HeadersInit = {}) =>
		getMethodCall(baseUrl, apiClient.put)(endpoint)(
			name,
			undefined,
			body,
			headers,
		),
	deleteDoc: (name: string, body: Object = {}, headers: HeadersInit = {}) =>
		getMethodCall(baseUrl, apiClient.delete)(endpoint)(
			name,
			undefined,
			body,
			headers,
		),
});

export default getResourceClient;

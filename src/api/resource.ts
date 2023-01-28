import {
	DocumentCallParamerters,
	ResourceApiParameters,
	ResourceClientParameters,
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
		body: Object = {},
		headers: HeadersInit = {},
	) =>
		getMethodCall(baseUrl, apiClient.get)(endpoint)(
			undefined,
			parameters,
			body,
			headers,
		),
	createDoc: (
		parameters: DocumentCallParamerters = {},
		body: Object = {},
		headers: HeadersInit = {},
	) =>
		getMethodCall(baseUrl, apiClient.post)(endpoint)(
			undefined,
			parameters,
			body,
			headers,
		),
	getDoc: getMethodCall(baseUrl, apiClient.get)(endpoint),
	updateDoc: getMethodCall(baseUrl, apiClient.put)(endpoint),
	deleteDoc: getMethodCall(baseUrl, apiClient.delete)(endpoint),
});

export default getResourceClient;

// (
//     parameters: DocumentCallParamerters = {},
//     body: Object = {},
//     headers: HeadersInit = {},
// ) => ({
//     getList: getMethodCall(baseUrl, apiClient.get)(
//         endpoint,
//         undefined,
//         parameters,
//         {},
//         headers,
//     ),
//     getDoc: getMethodCall(baseUrl, apiClient.get)(
//         endpoint,
//         name,
//         parameters,
//         body,
//         headers,
//     ),
//     createDoc: getMethodCall(baseUrl, apiClient.post)(
//         endpoint,
//         name,
//         parameters,
//         body,
//         headers,
//     ),
//     updateDoc: getMethodCall(baseUrl, apiClient.put)(
//         endpoint,
//         name,
//         parameters,
//         body,
//         headers,
//     ),
//     deleteDoc: getMethodCall(baseUrl, apiClient.delete)(
//         endpoint,
//         name,
//         parameters,
//         body,
//         headers,
//     ),

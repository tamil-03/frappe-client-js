import { MethodApiParameters } from '../utility/types';
import apiClient from './base';

const getMethodCall =
	(baseUrl: string, func: Function) =>
	async (endpoint: string, parameters: Object = {}, body: Object = {}) => {
		const params: MethodApiParameters = {
			baseUrl,
			path: 'api/method',
			endpoint,
			parameters,
		};
		const options: RequestInit = { body: JSON.stringify(body) };
		return await func(params, options);
	};

const getMethod = (baseUrl: string) => ({
	get: getMethodCall(baseUrl, apiClient.get),
	post: getMethodCall(baseUrl, apiClient.post),
	put: getMethodCall(baseUrl, apiClient.put),
	delete: getMethodCall(baseUrl, apiClient.delete),
});

export default getMethod;

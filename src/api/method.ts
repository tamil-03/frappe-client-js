import { MethodApiParameters } from '../utility/types';
import apiClient from './base';

const getMethodCall =
	(baseUrl: string, func: Function) =>
	async (endpoint: string, parameters: any) => {
		const params: MethodApiParameters = {
			baseUrl,
			path: 'api/method',
			endpoint,
			parameters,
		};

		return await func(params);
	};

const getMethod = (baseUrl: string) => ({
	get: getMethodCall(baseUrl, apiClient.get),
	post: getMethodCall(baseUrl, apiClient.post),
	put: getMethodCall(baseUrl, apiClient.put),
	delete: getMethodCall(baseUrl, apiClient.delete),
});

export default getMethod;

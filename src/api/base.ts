import { resolveResponse } from '../utility/promise';
import { getQueryString } from '../utility/string';
import { RESTMethod, ApiParameters } from '../utility/types';

const getURL = (params: ApiParameters) => {
	let url = `${params.baseUrl}/`;
	url += `${params.path}/`;
	url += params.endpoint;
	url += params.name ? `/${params.name}/` : '';
	url += params.parameters ? `?${getQueryString(params.parameters)}` : '';
	return url;
};

const getOptions = (method: RESTMethod, options: RequestInit) => {
	const headers = { 'Content-Type': 'application/json' };
	const body = method === 'GET' ? undefined : options?.body;
	const requestOptions: RequestInit = {
		...options,
		headers: { ...options?.headers, ...headers },
		method,
		body,
	};
	return requestOptions;
};

const getApiCall =
	(method: RESTMethod) =>
	async (url: ApiParameters, options: RequestInit | undefined = {}) => {
		return await resolveResponse(
			fetch(getURL(url), getOptions(method, options)),
		);
	};

const apiClient = {
	get: getApiCall('GET'),
	post: getApiCall('POST'),
	put: getApiCall('PUT'),
	delete: getApiCall('DELETE'),
};

export default apiClient;

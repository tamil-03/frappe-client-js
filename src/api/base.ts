import { resolveResponse, resolveFrappeResponse } from '../utility/promise';
import { getQueryString } from '../utility/string';
import { RESTMethod, ApiParameters, FrappeResponse } from '../utility/types';

export type ApiCall = (
	url: ApiParameters,
	options?: RequestInit,
) => Promise<FrappeResponse>;

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
	console.log(requestOptions);
	return requestOptions;
};

const getApiCall =
	(method: RESTMethod) =>
	async (
		url: ApiParameters,
		options: RequestInit | undefined = {},
	): Promise<FrappeResponse> =>
		await resolveFrappeResponse(
			resolveResponse(fetch(getURL(url), getOptions(method, options))),
		);

const apiClient: { [key: string]: ApiCall } = {
	get: getApiCall('GET'),
	post: getApiCall('POST'),
	put: getApiCall('PUT'),
	delete: getApiCall('DELETE'),
};

export default apiClient;

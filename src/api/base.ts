import { resolvePromise, resolveResponse } from '../utility/promise';
import { getQueryString } from '../utility/string';
import { RESTMethod, ApiParameters } from '../utility/types';

const getHeaders = () => ({
	'Content-Type': 'application/json',
	'User-Agent': 'Frappe client js',
	Accept: '*/*',
	'Accept-Encoding': 'gzip, deflate, br',
	Authorization: 'token', //getAccessToken();,
});

const getURL = (params: ApiParameters) => {
	let url = `${params.baseUrl}/`;
	url += `${params.path}/`;
	url += params.endpoint;
	url += params.name ? `/${params.name}/` : '';
	url += params.parameters ? `?${getQueryString(params.parameters)}` : '';
	return url;
};

const getApiCall =
	(method: RESTMethod) =>
	async (url: ApiParameters, options: RequestInit | undefined = {}) => {
		const [response, responseError] = await resolveResponse(
			fetch(getURL(url), {
				method,
				...options,
				headers: getHeaders(),
			}),
		);

		if (response) return await resolvePromise(response.json());

		if (responseError instanceof Response)
			return [null, await resolvePromise(responseError.json())];

		return [null, responseError];
	};

const apiClient = {
	get: getApiCall('GET'),
	post: getApiCall('POST'),
	put: getApiCall('PUT'),
	delete: getApiCall('DELETE'),
};

export default apiClient;

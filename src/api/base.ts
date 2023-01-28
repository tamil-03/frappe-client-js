import { resolvePromise, resolveResponse } from '../utility/promise';
import { getQueryString } from '../utility/string';
import { ApiParameters } from '../utility/types';

const getURL = (params: ApiParameters) => {
	let url = `${params.baseUrl}/`;
	url += `${params.path}/`;
	url += params.endpoint;
	url += params.name ? `/${params.name}/` : '';
	url += params.parameters ? `?${getQueryString(params.parameters)}` : '';
	return url;
};

const getApiCall =
	(method: 'GET' | 'POST' | 'PUT' | 'DELETE') =>
	async (url: ApiParameters, options: RequestInit | undefined = {}) => {
		const [response, responseError] = await resolveResponse(
			fetch(getURL(url), { method, ...options }),
		);
		const [data, dataError] = response
			? await resolvePromise(response.json())
			: [null, responseError];

		return [data, dataError];
	};

const apiClient = {
	get: getApiCall('GET'),
	post: getApiCall('POST'),
	put: getApiCall('PUT'),
	delete: getApiCall('DELETE'),
};

export default apiClient;

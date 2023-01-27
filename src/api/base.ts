import { resolvePromise, resolveResponse } from '../utility/promise';
import { getQueryString } from '../utility/string';
import { GetApiParameters } from '../utility/types';

const getURL = (params: GetApiParameters) => {
	let url = `${params.baseUrl}/`;
	url += `${params.path}/`;
	url += params.endpoint;
	url += params.id ? `/${params.id}/` : '';
	url += params.parameters ? `?${getQueryString(params.parameters)}` : '';
	return url;
};

const getApiCall =
	(method: 'GET' | 'POST' | 'PUT' | 'DELETE') =>
	async (url: GetApiParameters, options: RequestInit | undefined = {}) => {
		const [response, responseError] = await resolveResponse(
			fetch(getURL(url), { method, ...options }),
		);
		const [data, dataError] = response
			? await resolvePromise(response.json())
			: [null, responseError];

		return [data, dataError];
	};

const restBase = {
	get: getApiCall('GET'),
	post: getApiCall('POST'),
	put: getApiCall('PUT'),
	delete: getApiCall('DELETE'),
};

export default restBase;

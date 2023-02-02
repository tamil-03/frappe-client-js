import { FrappeResponse } from './types';

export const resolveFrappeResponse = async (
	result: Promise<[null | Response, null | Response | Error]>,
): Promise<FrappeResponse> => {
	const [response, error] = await result;

	if (error) {
		if (error instanceof Error)
			return {
				ok: false,
				message: error.message,
				response: error,
			};

		if (error instanceof Response) {
			const errorResponse = await error.json();
			return {
				ok: false,
				message:
					errorResponse?.message ||
					errorResponse?.exception ||
					'Something went wrong',
				response: error,
				data: errorResponse?.data,
				body: errorResponse,
			};
		}
	}

	if (!response || !(response instanceof Response))
		return {
			ok: false,
			message: 'Something went wrong',
			response: response,
		};

	const data = await response.json();

	return {
		ok: response.ok,
		message: data?.message || '',
		data: data?.data,
		response: response,
		body: data,
	};
};

export const resolvePromise = async (
	promise: Promise<any>,
): Promise<[any, any]> => {
	try {
		const result = await promise;
		return [result, null];
	} catch (error) {
		return [null, error];
	}
};

export const resolveResponse = async (
	promise: Promise<Response>,
): Promise<[Response | null, any]> => {
	try {
		const response: Response = await promise;

		const status = response.status;
		if (!(status >= 200 && status < 300)) {
			return [null, response];
		}

		return [response, null];
	} catch (error) {
		return [null, error];
	}
};

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

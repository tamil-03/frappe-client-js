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
		const result: Response = await promise;
		return [result, null];
	} catch (error) {
		return [null, error];
	}
};

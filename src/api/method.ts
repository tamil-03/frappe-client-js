import BaseAPIClient from './client';
import { FrappePath } from './types';

class Method extends BaseAPIClient {
	protected type: FrappePath = '/api/method/';

	constructor(
		baseUrl: string,
		appName: string,
		getGlobalOptions?: () => Promise<RequestInit>,
	) {
		super(baseUrl, `${appName}.`, getGlobalOptions);
	}

	public get(endpoint: string, data?: object, options?: RequestInit) {
		return this.getCall('GET')(endpoint, data, options);
	}

	public post(endpoint: string, data?: object, options?: RequestInit) {
		return this.getCall('POST')(endpoint, data, options);
	}

	public put(endpoint: string, data?: object, options?: RequestInit) {
		return this.getCall('PUT')(endpoint, data, options);
	}

	public patch(endpoint: string, data?: object, options?: RequestInit) {
		return this.getCall('PATCH')(endpoint, data, options);
	}

	public delete(endpoint: string, data?: object, options?: RequestInit) {
		return this.getCall('DELETE')(endpoint, data, options);
	}

	public head(endpoint: string, data?: object, options?: RequestInit) {
		return this.getCall('HEAD')(endpoint, data, options);
	}

	public options(endpoint: string, data?: object, options?: RequestInit) {
		return this.getCall('OPTIONS')(endpoint, data, options);
	}
}

export default Method;

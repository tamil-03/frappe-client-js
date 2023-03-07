import { APICall, FrappeResponse, HTTPMethod } from './types';

class BaseAPIClient {
	protected readonly SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS'];
	protected readonly DEFAULT_HEADERS = {
		'Content-Type': 'application/json',
	};

	protected type: '/api/method/' | '/api/resource/' = '/api/method/';
	protected baseUrl: string;
	protected path: string;
	protected getGlobalOptions?: () => Promise<RequestInit>;

	constructor(
		baseUrl: string,
		path: string,
		getGlobalOptions?: () => Promise<RequestInit>,
	) {
		this.baseUrl = baseUrl;
		this.path = path;
		this.getGlobalOptions = getGlobalOptions;
	}

	// public methods
	public async baseCall(
		endpoint: string,
		method: HTTPMethod = 'GET',
		data?: object,
		options?: RequestInit,
	): Promise<Response> {
		const isSafe = this.isSafeMethod(method);

		const url: string = `${this.baseUrl}/${endpoint}`;
		const body = isSafe ? undefined : JSON.stringify(data);
		const opts = await this.getOptions(options);

		return fetch(url, { ...opts, method, body });
	}

	public async call(
		endpoint: string,
		method: HTTPMethod = 'GET',
		data?: object,
		options?: RequestInit,
	): Promise<FrappeResponse> {
		const isSafe = this.isSafeMethod(method);

		const url: string = `${this.baseUrl}/${endpoint}`;
		const body = isSafe ? undefined : JSON.stringify(data);
		const opts = await this.getOptions(options);

		return this.resolveFrappeResponse(fetch(url, { ...opts, method, body }));
	}

	// protected  methods
	protected getCall(method: HTTPMethod = 'GET'): APICall {
		return async (
			endpoint?: string,
			data?: object,
			options?: RequestInit,
		): Promise<FrappeResponse> => {
			const isSafe = this.isSafeMethod(method);

			const url: string = this.getUrl(endpoint, isSafe ? data : {});
			const body = isSafe ? undefined : JSON.stringify(data);
			const opts = await this.getOptions(options);

			console.log(method, url);

			return this.resolveFrappeResponse(fetch(url, { ...opts, method, body }));
		};
	}

	protected isSafeMethod(method: HTTPMethod): boolean {
		return this.SAFE_METHODS.includes(method);
	}

	protected getPath(endpoint?: string): string {
		return `${this.type}${this.path}${endpoint ? `${endpoint}` : ''}`;
	}

	protected getUrl(endpoint: string = '', query: object = {}) {
		const url = new URL(this.getPath(endpoint), this.baseUrl);
		const queryString = this.getQueryString(query);
		return url.href + queryString;
	}

	protected getQueryString(parameters: object): string {
		if (!parameters) return '';
		let query = '';
		const entries = Object.entries(parameters);
		for (let i = 0; i < entries.length; i++) {
			const [k, v] = entries[i];
			const head = i === 0 ? '?' : '';
			const tail = i < entries.length - 1 ? '&' : '';
			const value = ['number', 'string', 'boolean'].includes(typeof v)
				? v
				: JSON.stringify(v);
			query += `${head}${k}=${value}${tail}`;
		}
		return query;
	}

	protected async getOptions(options: RequestInit = {}): Promise<RequestInit> {
		const globalOptions = this.getGlobalOptions
			? await this.getGlobalOptions()
			: {};
		return {
			...globalOptions,
			...options,
			headers: {
				...this.DEFAULT_HEADERS,
				...globalOptions?.headers,
				...options?.headers,
			},
		};
	}

	protected async resolveResponse(
		promise: Promise<Response>,
	): Promise<[Response | null, any]> {
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
	}

	protected resolveFrappeResponse = async (
		result: Promise<Response>,
	): Promise<FrappeResponse> => {
		const [response, error] = await this.resolveResponse(result);

		if (error) {
			if (error instanceof Error)
				return {
					ok: false,
					status: -1,
					message: error.message,
					__response: error,
				};

			if (error instanceof Response) {
				const errorResponse = await error.json();
				return {
					ok: false,
					status: error.status,
					message:
						errorResponse?.message ||
						errorResponse?.exception ||
						'Something went wrong',
					data: errorResponse?.data,
					__body: errorResponse,
					__response: error,
				};
			}
		}

		if (!response || !(response instanceof Response))
			return {
				ok: false,
				status: 500,
				message: 'Something went wrong',
				__response: response,
			};

		const data = await response.json();

		return {
			ok: response.ok,
			status: response.status,
			message: data?.message || '',
			data: data?.data,
			__body: data,
			__response: response,
		};
	};
}

export default BaseAPIClient;

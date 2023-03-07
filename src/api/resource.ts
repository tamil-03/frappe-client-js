import BaseAPIClient from './client';
import Document from './document';
import { DocumentCallParamerters, FrappePath } from './types';

class Resource extends BaseAPIClient {
	protected type: FrappePath = '/api/resource/';

	constructor(
		baseUrl: string,
		doctype: string,
		getGlobalOptions?: () => Promise<RequestInit>,
	) {
		super(baseUrl, `${doctype}`, getGlobalOptions);
	}

	public list(query?: DocumentCallParamerters, options?: RequestInit) {
		return this.getCall('GET')('/', query, options);
	}

	public get(name: string, options?: RequestInit) {
		return this.getCall('GET')(`/${name}`, {}, options);
	}

	public getDoc(name: string) {
		const doc: Document = new Document(
			this.baseUrl,
			this.path,
			name,
			this.getGlobalOptions,
		);
		return doc;
	}

	public create(data: object, options?: RequestInit) {
		return this.getCall('POST')('', data, options);
	}
}

export default Resource;

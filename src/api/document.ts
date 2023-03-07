import BaseAPIClient from './client';
import { Doc, FrappePath } from './types';

class Document extends BaseAPIClient {
	protected type: FrappePath = '/api/resource/';
	protected document?: object;

	constructor(
		baseUrl: string,
		doctype: string,
		docname: string,
		getGlobalOptions?: () => Promise<RequestInit>,
	) {
		super(baseUrl, `${doctype}/${docname}`, getGlobalOptions);
	}

	public getDocument() {
		return this.document;
	}

	public async get(options?: RequestInit) {
		const result = await this.getCall('GET')('', {}, options);
		this.document = result.data as object;
		return result.data;
	}

	public async update(data: object, options?: RequestInit) {
		await this.getCall('PUT')('', data, options);
		return await this.get();
	}

	public async delete(options?: RequestInit) {
		const result = await this.getCall('DELETE')('', {}, options);
		this.document = undefined;
		return result.data;
	}
}

export default Document;

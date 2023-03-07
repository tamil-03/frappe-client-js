import { Document, Method, Resource } from './api';
export * from './api/types';
export class FrappeClient {
	private baseUrl: string;
	private getGlobalOptions?: () => Promise<RequestInit>;

	constructor(baseUrl: string, getGlobalOptions?: () => Promise<RequestInit>) {
		this.baseUrl = baseUrl;
		this.getGlobalOptions = getGlobalOptions;
	}

	public Resource(doctype: string): Resource {
		const resource: Resource = new Resource(
			this.baseUrl,
			doctype,
			this.getGlobalOptions,
		);
		return resource;
	}

	public Method(appName: string): Method {
		const methodClient: Method = new Method(
			this.baseUrl,
			appName,
			this.getGlobalOptions,
		);
		return methodClient;
	}

	public Document(doctype: string, docname: string): Document {
		const doc: Document = new Document(
			this.baseUrl,
			doctype,
			docname,
			this.getGlobalOptions,
		);
		return doc;
	}
}

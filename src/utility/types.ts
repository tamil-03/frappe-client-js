export type RESTMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type DocumentCallParamerters = {
	fields?: string[];
	filters?: { [key: string]: string };
	order_by?: string;
	or_filters?: { [key: string]: string };
	limit_start?: number;
	limit_page_length?: number;
	limit?: number;
	as_dict?: boolean;
	with_comment_count?: boolean;
	debug?: boolean;
};

export type ApiParameters = {
	baseUrl: string;
	path: 'api/resource' | 'api/method';
	endpoint: string;
	name?: string;
	parameters?: DocumentCallParamerters;
};

export type MethodApiParameters = {
	baseUrl: string;
	path: 'api/method';
	endpoint: string;
	parameters?: Object;
};

export type ResourceApiParameters = {
	baseUrl: string;
	path: 'api/resource';
	endpoint: string;
	name?: string;
	parameters?: DocumentCallParamerters;
};

export type ResourceClientParameters = {
	parameters?: DocumentCallParamerters;
	body?: Object;
	headers?: HeadersInit;
};

export type DocumentCallParamerters = {
	fields?: string[]; // ['name', 'title']
	filters?: { [key: string]: string }; // { name: 'test' }
	order_by?: string; // 'name desc'
	or_filters?: { [key: string]: string }; // { name: 'test2' }
	limit_start?: number; // 0
	limit_page_length?: number; // 20
	limit?: number; // 20
	as_dict?: boolean; // true
	with_comment_count?: boolean; // true
	debug?: boolean; // true
};

export type ApiParameters = {
	baseUrl: string; // http://localhost:8000
	path: 'api/resource' | 'api/method'; // api/resource
	endpoint: string; // DocType (or) Method Path
	name?: string; // DocName
	parameters?: DocumentCallParamerters; // { fields: ['name', 'title'], filters: { name: 'test' },  .... }
};

export type MethodApiParameters = {
	baseUrl: string; // http://localhost:8000
	path: 'api/method'; // api/resource
	endpoint: string; // MethodPath
	parameters?: DocumentCallParamerters; // { fields: ['name', 'title'], filters: { name: 'test' },  .... }
};

export type ResourceApiParameters = {
	baseUrl: string; // http://localhost:8000
	path: 'api/resource'; // api/resource
	endpoint: string; // MethodPath
	name?: string; // DocName
	parameters?: DocumentCallParamerters;
	body?: Object;
};

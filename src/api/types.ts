export type HTTPMethod =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'PATCH'
	| 'HEAD'
	| 'OPTIONS';

export type FrappePath = '/api/method/' | '/api/resource/';

export type FrappeResponse = {
	ok: boolean;
	status: number;
	message: string;
	data?: object | string | number;
	__body?: object | string | number;
	__response: Response | Error | null;
};

export type APICall = (
	path?: string,
	data?: object,
	options?: RequestInit,
) => Promise<FrappeResponse>;

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

export type Doc<T> = {
	name: string | number;
	owner: 'Guest' | 'Administrator' | string;
	creation: string;
	modified: string;
	modified_by: 'Guest' | 'Administrator' | string;
	docstatus: 0 | 1 | 2;
	idx: number;
	doctype: T;
	[key: string | number | symbol]: any;
};

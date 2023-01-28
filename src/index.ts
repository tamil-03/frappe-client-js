import getApiClient from './api';

const client = getApiClient('http://95.111.200.229/');

const test_document_api = client.resource('Test Document');

test_document_api.getList().then(res => console.log(res[0].data));

client.method
	.get('lakshmiagency.api.get_doc', { name: 'Test Document', date: 'fad' })
	.then(res => console.log(res[0].message));

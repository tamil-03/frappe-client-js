import apiClient from './api/base';

async function call() {
	const [result, error] = await apiClient.get({
		baseUrl: 'http://95.111.200.229',
		path: 'api/resource',
		endpoint: 'Test Document',
		// id: 'ae0782ff4d',
		// parameters: { fields: ['name'], filters: { name: '16411b555d' } },
	});

	if (error) throw error;

	console.log(result);
}

call();

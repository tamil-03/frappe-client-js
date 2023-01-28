import getResource from './api/resource';

const methodCall = getResource('http://95.111.200.229');

const call = async (name?: string) => {
	const result = await methodCall.delete(
		'Test Document',
		name,
		{},
		{ field_1: 'T', field_2: 2 },
		{},
	);
	console.log(result[0]);
};

call('ac8b389c38');

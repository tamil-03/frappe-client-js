import getMethod from './api/method';

const methodCall = getMethod('http://95.111.200.229');

const call = async () => {
	const result = await methodCall.post('lakshmiagency.api.get_doc', undefined, {
		name: 'Lakshmi Agency 2',
		date: 'Munthannethu',
	});

	console.log(result);
};
call();

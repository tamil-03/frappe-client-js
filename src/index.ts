import getMethod from './api/method';

const methodCall = getMethod('http://95.111.200.229');

const call = async () => {
	const result = await methodCall.delete('lakshmiagency.api.get_doc', {
		name: 'Lakshmi Agency',
		date: 'Nethu',
	});

	console.log(result);
};
call();

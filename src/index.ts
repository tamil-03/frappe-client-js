import getResourceClient from './api/resource';

const call = async () => {
	const methodClient = getResourceClient('http://95.111.200.229/')(
		'Test Document',
	);
	const result = await methodClient.deleteDoc('22961b3957');
	console.log(result[0]);
};

call();

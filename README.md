# frappe-client-js

[![CI Status](https://img.shields.io/github/actions/workflow/status/tamil-03/frappe-client-js/?branch=main)](https://github.com/tamil-03/frappe-client-js/actions/workflows/)
[![npm](https://img.shields.io/npm/v/frappe-client.svg)](https://www.npmjs.com/package/frappe-client)
[![License](https://img.shields.io/github/license/tamil-03/frappe-client-js.svg)](LICENSE)

Client Utility for frappe framework

## Install

---

```sh
npm install frappe-client
```

## Usage

---

### Importing

```js
import { FrappeClient } from 'frappe-client';
// or
const { FrappeClient } = require('frappe-client');
```

### Creating a client

```js
const getHeaders = async () => ({
	Authorization: 'Bearer ...',
});

// includes all the clients (api, etc)
const frappe = new FrappeClient(baseURL, getHeaders);
```

### Frappe Resource Calls (Direct Doctype Access)

```js
const doctype = frappe.Resource('Doctype');

doctype.list({ filters, fields, ...more }).then(res => console.log(res.data)); // get list of documents
doctype.create({ ...data }).then(res => console.log(res.data)); // create a document
doctype.get('docname').then(res => console.log(res.data)); // get a document

const document = doctype.getDoc('docname'); // get a Document object
```

#### Resource Call Example

```js
(async () => {
	const doctype = frappe.Resource('Doctype');
	const response = await doctype.list({ filters, fields, ...more });
	console.log(response.data);
})();
```

### Frappe Document Acces

```js
const doctype = frappe.Resource('Doctype');

// get a Document object
const document = doctype.getDoc('docname');
// or
const document = frappe.Document('Doctype', 'docname');

document.get().then(console.log); // get data from server and add it to cache
document.update({ ...data }).then(console.log); // update data and update to cache
document.delete().then(console.log); // delete data and remove from cache
console.log(document.getDocument()) // get data from cache
```

#### Document Call Example

```js
(async () => {
	const doctype = frappe.Resource('Doctype');
	const document = frappe.Document('Doctype', 'docname');
	const response = await document.get();
	console.log(response);
})();
```

### Frappe Remote Method Calls

```js
// we can access the methods scoped to the app
const app = frappe.Method('appName'); // get a Method object with the appname

app.get(methodPath, args); // GET request
app.post(methodPath, args); // POST request
app.put(methodPath, args); // PUT request
app.delete(methodPath, args); // DELETE request
app.head(methodPath, args); // HEAD request
app.options(methodPath, args); // OPTIONS request
```

#### Method Call Example (RPC)

```js
const app = frappe.Method('appName');
app
	.post('module_name.path.method_name', {
		arg1: 'ARG!',
		arg2: 'ARG!!',
	})
	.then(console.log);
```

## Testing

---

```sh
npm test
```

## License

---

The MIT License. See the [license file](LICENSE) for details.

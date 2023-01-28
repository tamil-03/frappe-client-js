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
const { FrappeClient, getApiClient } = require('frappe-client');
```

### Creating a client

```js
// includes all the clients (api, etc)
const frappe = FrappeClient('https://localhost:80/');

// for separate client
const apiClient = getApiClient('https://localhost:80/');
```

### Frappe Resource Calls (Direct Doctype Access)

```js
const document = frappe.resource('Doctype Name');
document.getList(params, headers); // get list of doucments
document.getDoc(name, params, headers); // get document by name
document.createDoc(body, headers); // create document
document.updateDoc(name, body, headers); // update document
document.deleteDoc(name, body, headers); // delete document
```

#### Resource Call Example

```js
async () => {
 const TestDocument = frappe.resource('DocType Name');
 const [response, error] = await TestDocument.deleteDoc('document name');

 if (error) console.log(error);
    else console.log(response);
};
```

### Frappe Remote Method Calls

```js
const methodApi = frappe.method;
methodApi.get(methodPath, args, headers); // GET request
methodApi.post(methodPath, args, headers); // POST request
methodApi.put(methodPath, args, headers); // PUT request
methodApi.delete(methodPath, args, headers); // DELETE request
```

#### Method Call Example

```js
frappe.method.get(
    'app_name.api.method_name', // remote method path
    { arg1: 'value 1', arg2: 'value 2' }, // args for remote method
    { 'X-AUTH': 'special_key' } // headers
).then(res => res[0]?.json())
.then(data => console.log(data))
.catch(err => console.log(err));
```

## Testing

---

```sh
npm test
```

## License

---
The MIT License. See the [license file](LICENSE) for details.

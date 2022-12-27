import { createServer } from 'http';
import { users } from './utils/users';
import { StatusCodes } from './utils/statusCodes';
import { regexExp } from './utils/uuidValidation';

const port = 3000;
const host = 'localhost';
const baseURL = '/api/users/';

const server = createServer((req, res) => {
	res.setHeader('Content-Type', 'application/json');
	const URIparam = req.url.slice(baseURL.length);

	// get by id
	if (URIparam.length > 0) {
		const foundUser = users.find(f => f.id === URIparam);

		// invalid id
		if (!regexExp.test(URIparam)) {
			res.writeHead(StatusCodes.badRequest);
			res.write(JSON.stringify({ error: 'Incorrect userId' }));
			res.end();
			return;
		}

		// doesn't exist
		if (!foundUser) {
			res.writeHead(StatusCodes.notFound);
			res.write(JSON.stringify({ error: `User with ${URIparam} id doesn't exist` }));
			res.end();
			return;
		}

		// all good
		res.writeHead(StatusCodes.ok);
		res.end(JSON.stringify(foundUser));
		return;
	}

	// get all users
	if (req.url === baseURL) {
		res.writeHead(StatusCodes.ok);
		res.end(JSON.stringify(users));
	}
});

server.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`);
});

const getSuccessResponse = (body) => getCustomResponse(200, body);

const getErrorResponse = (body) =>
	getCustomResponse(500, body ? body : { message: 'Internal Server Error' });

const getCustomResponse = (statusCode, body) => ({
	statusCode,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': process.env.CORS,
	},
	body: body ? JSON.stringify(body) : null,
});

module.exports = { getSuccessResponse, getErrorResponse, getCustomResponse };

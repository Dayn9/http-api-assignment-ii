const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style': htmlHandler.getStyle,
    '/getUsers': jsonHandler.getUsers,
    '/updateUsers': jsonHandler.updateUsers,
    '/notFound': jsonHandler.notFound,
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    '/updateUsers': jsonHandler.updateUsersMeta,
    '/notFound': jsonHandler.notFoundMeta,
  },
};

const onRequest = (request, response) => {
  // get the URL data
  const parsedUrl = url.parse(request.url);
  // get the queries
  const params = query.parse(parsedUrl.query);

  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct[request.method]['/notFound'](request, response, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

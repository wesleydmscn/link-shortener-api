export function extendResponse(response) {
  response.status = function (statusCode) {
    this.statusCode = statusCode;
    return this;
  };

  response.json = function (body) {
    response.setHeader("content-type", "application/json");
    response.end(JSON.stringify(body));
    return this;
  };

  response.redirect = function (statusCode, location) {
    response.writeHead(statusCode, { Location: location });
    response.end();
  };

  return { response };
}

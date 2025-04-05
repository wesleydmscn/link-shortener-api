export function bodyParser(request, callback) {
  let body = "";

  if (!["POST", "PUT", "PATCH"].includes(request.method)) {
    return callback();
  }

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", () => {
    body = JSON.parse(body);
    request.body = body;
    callback();
  });
}

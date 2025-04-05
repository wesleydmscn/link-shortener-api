import { createServer } from "node:http";

import { extendResponse } from "./helpers/extend-response.js";
import { bodyParser } from "./helpers/body-parser.js";

import routes from "./route.js";

const BASE_URL = "http://localhost:3000";

const app = createServer((request, res) => {
  const parsedUrl = new URL(BASE_URL + request.url);
  const { response } = extendResponse(res);

  let { pathname } = parsedUrl;

  console.log(`Request method: ${request.method} | Endpoint: ${pathname}`);

  let short_code = null;

  const splitEndpoint = pathname.split("/").filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:short_code`;
    short_code = splitEndpoint[1];
  }

  const route = routes.find(
    ({ endpoint, method }) => endpoint === pathname && method === request.method
  );

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { short_code };

    return bodyParser(request, () => route.handler(request, response));
  }

  response.status(404).json({ error: `Cannot ${request.method} ${pathname}` });
});

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});

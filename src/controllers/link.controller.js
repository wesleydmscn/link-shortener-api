import { randomUUID } from "node:crypto";

import rawLinks from "../mocks/links.js";

let links = rawLinks;

export default {
  listLinks(_, response) {
    response.status(200).json(links);
  },
  getLinkByShortCode(request, response) {
    const { short_code } = request.params;

    const link = links.find((link) => link.short_code === short_code);

    if (!link) {
      return response.status(400).json({ error: "Link not found" });
    }

    response.status(200).json(link);
  },
  createLink(request, response) {
    const { body } = request;

    const linkExists = links.find(
      (link) => link.short_code === body.short_code
    );

    if (linkExists) {
      return response.status(400).json({ error: "Short code already exists" });
    }

    const newLink = {
      id: randomUUID(),
      original_url: body.original_url,
      short_code: body.short_code,
      created_at: new Date().toISOString(),
    };

    links.push(newLink);

    response.status(201).json(newLink);
  },
  deleteLink(request, response) {
    const { short_code } = request.params;

    const link = links.find((link) => link.short_code === short_code);

    if (!link) {
      return response.status(400).json({ error: "Link not found" });
    }

    links = links.filter((link) => link.short_code !== short_code);

    response.status(204).end();
  },
  redirectToLink(request, response) {
    const { short_code } = request.params;

    const link = links.find((link) => link.short_code === short_code);

    if (!link) {
      return response.status(400).json({ error: "Link not found" });
    }

    response.redirect(301, link.original_url);
  },
};

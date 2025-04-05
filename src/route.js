import linkController from "./controllers/link.controller.js";

export default [
  {
    endpoint: "/links",
    method: "GET",
    handler: linkController.listLinks,
  },
  {
    endpoint: "/links/:short_code",
    method: "GET",
    handler: linkController.getLinkByShortCode,
  },
  {
    endpoint: "/links",
    method: "POST",
    handler: linkController.createLink,
  },
  {
    endpoint: "/links/:short_code",
    method: "DELETE",
    handler: linkController.deleteLink,
  },
  {
    endpoint: "/r/:short_code",
    method: "GET",
    handler: linkController.redirectToLink,
  },
];

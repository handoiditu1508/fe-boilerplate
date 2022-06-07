const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults();
const delayMiddleware = require("./middlewares/delay-middleware");
const port = 3000;

// Add middlewares
server.use(middlewares);
server.use(delayMiddleware(2000));

// To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router
server.get("/api/echo", (req, res) => {
  res.jsonp("hello!");
});

server.post("/api/echo", (req, res) => {
  res.status(200).jsonp("added!");
});

// Define a protected route
server.get("/api/protected-echo", (req, res) => {
  if (isAuthorized(req)) {
    res.jsonp("hello!");
  } else {
    res.sendStatus(401);
  }
});

server.use("/api", router);

server.listen(port, () => {
  console.log("JSON Server is running on http://localhost:" + port + ". Press Ctrl-C to terminate.");
});

function isAuthorized(req) {
  return false;
}
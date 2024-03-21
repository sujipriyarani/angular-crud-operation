const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS with specific options
// server.use(cors({
//   origin: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
server.use(cors());
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000; // Port where your JSON server will run

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

// const forceDatabaseRefresh = false;

// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import cookieParser from 'cookie-parser';
// import routes from './routes/index.js';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// import { sequelize } from './models/index.js';

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(cookieParser());

// app.use(routes);

// if (process.env.PORT) {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = dirname(__filename);

//   // Use the __dirname variable along with the join function from path to share the dist folder in client through express.static()
//   app.use(express.static(join(__dirname, '../client/dist')));

//   // Create a catch-all route with a wildcard(*) to send the index.html file in client/dist
//   app.get('*', (_, res) => {
//     console.log('DIRNAME YOOOOOOO', __dirname);
//     const clientpath = __dirname.replace('server', 'client');
//     const finalpath = join(clientpath, '../dist','index.html');
//     console.log('CLIENT PATH LOG', clientpath);
//     console.log('FINAL PATH LOG', finalpath);
//     res.sendFile(finalpath);
//   });
// }

// sequelize.sync({force: forceDatabaseRefresh}).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });
// });

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false;

app.use(express.json());
app.use(cookieParser());
app.use(routes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the React build folder
const clientDistPath = join(__dirname, '../client/dist');
console.log('Serving static files from:', clientDistPath);
app.use(express.static(clientDistPath));

// Wildcard route to handle client-side routing
app.get('*', (req, res) => {
  console.log('Handling wildcard route for:', req.url);
  res.sendFile(join(clientDistPath, 'index.html'));
});

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
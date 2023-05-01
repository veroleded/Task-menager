// @ts-check

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrations = {
  directory: path.join(__dirname, 'server', 'migrations'),
};

export const development = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
  migrations,
};

export const test = {
  client: 'sqlite3',
  connection: ':memory:',
  useNullAsDefault: true,
  // debug: true,
  migrations,
};

export const production = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  useNullAsDefault: true,
  migrations,
};

// module.exports = {
//   development: {
//     client: 'sqlite3',
//     useNullAsDefault: true,
//     connection: {
//       filename: './example.db',
//     },
//     pool: {
//       afterCreate: (conn, cb) => {
//         conn.run('PRAGMA foreign_keys = ON', cb);
//       },
//     },
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'example',
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//   },
// };

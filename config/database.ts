import path from 'path';

// export default ({ env }) => {
//   const client = 'mysql'; // Forçar MySQL

//   const connections = {
//     mysql: {
//       connection: {
//         host: env('DATABASE_HOST', 'localhost'),
//         port: env.int('DATABASE_PORT', 3306),
//         database: env('DATABASE_NAME', 'meubanco'),
//         user: env('DATABASE_USERNAME', 'root'),
//         password: env('DATABASE_PASSWORD', 'root'),
//         ssl: env.bool('DATABASE_SSL', false),
//       },
//       pool: { min: 2, max: 10 },
//     },
//   };

//   return {
//     connection: {
//       client,
//       ...connections[client],
//       acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
//     },
//   };
// };

module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', 'mysql.railway.internal'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'railway'),
      user: env('DATABASE_USERNAME', 'root'),
      password: env('DATABASE_PASSWORD', 'sua_senha'),
      ssl: env.bool('DATABASE_SSL', true)
        ? { rejectUnauthorized: false } // Adiciona essa linha
        : false,
    },
  },
});

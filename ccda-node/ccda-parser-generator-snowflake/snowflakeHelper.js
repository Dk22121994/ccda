const snowflake = require('snowflake-sdk');

const connectionOptions = {
  account: 'your_account',
  username: 'your_username',
  password: 'your_password',
  warehouse: 'your_warehouse',
  database: 'your_database',
  schema: 'your_schema'
};

let connection;

async function connectToSnowflake() {
  return new Promise((resolve, reject) => {
    connection = snowflake.createConnection(connectionOptions);
    connection.connect((err, conn) => {
      if (err) {
        reject(err);
      } else {
        resolve(conn);
      }
    });
  });
}

async function disconnectFromSnowflake() {
  return new Promise((resolve, reject) => {
    if (connection) {
      connection.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          resolve('Disconnected from Snowflake');
        }
      });
    } else {
      resolve('Not connected to Snowflake');
    }
  });
}

async function callStoredProcedure(procName, params) {
    return new Promise((resolve, reject) => {
      if (!connection || !connection.isUp()) {
        reject('Not connected to Snowflake');
      } else {
        const placeholders = Array(params.length).fill('?').join(', ');
        const sql = `CALL ${procName}(${placeholders})`;
  
        connection.execute({
          sqlText: sql,
          binds: params,
          complete: (err, stmt, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          }
        });
      }
    });
  }

module.exports = {
  connectToSnowflake,
  disconnectFromSnowflake,
  callStoredProcedure
};
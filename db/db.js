const mysql      = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'lts'
});

function query(sql,value, callback) {
  pool.getConnection(function (err, connection) {
      // Use the connection
      connection.query(sql, value,function (err, rows) {
          callback(err, rows);
          connection.release();//释放链接
      });
  });
}
exports.query = query;
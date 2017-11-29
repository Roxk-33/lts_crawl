const query = require("./db").query;
const SQL = require('config-lite')(__dirname).sql;

module.exports = {

 

  saveArticle: (sql,Article) => {
    return new Promise((resolve, reject) => {
      query(
        sql,
        Article,
        function(err, result) {
          if (err) throw err;
      
      
          resolve();
        }
      );
    })
     
  },
  getArticle: (sql) => {
    return new Promise((resolve, reject) => {
      query(
        sql,
        
        function(err, result) {
          if (err) throw err;
      
      
          resolve(result);
        }
      );
    })
     
  },
  setArticle: (sql,val) => {
    return new Promise((resolve, reject) => {
      query(
        sql,
       val,
        function(err, result) {
          if (err) throw err;
      
      
          resolve(result);
        }
      );
    })
     
  },
};

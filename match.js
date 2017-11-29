const trimHtml = require('./trimHtml');
const config = require('config-lite')(__dirname);
const getArticle = require('./db/operateDB').getArticle;
const setArticle = require('./db/operateDB').setArticle;

module.exports = async function(){
    const tables = ['research','information','achievement','exchange'];
    const table = tables[1];
    const id = 20;
        const result = await getArticle(`select id,summary from articles where id = ${id}`)
        const patt1 = /<img [^>]*src=['"]([^'"]+)[^>]*>/;
        const patt2 = /^[,]*/;
        const patt3 = /(^\s*)|(\s*$)/g;
        const patt4 =  /&nbsp;/g;
        const patt5=  /onload=\"resizepic\(this\)\"/g;
        const patt6=  /<p><br><\/p>/;
       
        
        // for(var i = 0; i < result.length;i++){
            let summary = result[0].summary.replace(patt2, "")

            // let id = result[i].id;
            // let summary =trimHtml(summary, { preserveTags: false, limit: 20 }).html
            // let IMG = '';
            // if(patt1.test(summary)){
    
            //     IMG +=summary.match(patt1)[1];
            // }else{
            //     IMG = '0'
            // }
            setArticle(`update articles  set summary = ? where id = ?`,[summary,id]);
            // console.log(id,IMG,summary)
        // }
}
const crawl = require("./util").crawl;
const forMat = require("./util").forMat;
const cheerio = require("cheerio");
const operateDB = require("./db/operateDB");
const config = require("config-lite")(__dirname);
var iconv = require("iconv-lite");
const trimHtml = require("./trimHtml");
const downImg = require("./downImg");

const getImg = async content => {
  const patt = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi;
  const patt1 = new RegExp('file:///C:');
  const patt2 = new RegExp('http');
  content = content.replace('oldsrc','old');
  if (patt.test(content)) {
    content = await content.replace(patt, (match, capture) => {
    
      path ="/images/uploadImg/" +(parseInt(Date.now()) + Math.ceil(Math.random() * 10)) +".png";
      //图片不存在，替换成这个
      let onerror = "/images/error.jpg";
      let result = '<img onerror="this.src=\''+onerror+'\'" src="' + path + '" style="width:400px;" >';
      
      if(patt1.test(capture)||!patt2.test(capture)) return '';
      downImg(capture, "/Users/hao/Desktop/lts_node/static" + path)
        
      return result;
    });
  }
  return content;
};
async function getURL(classId, page) {

  let aList = [];
  while (page > 0) {
    const resp = await crawl(config.catalog, { ClassID: classId, page }).catch(
      e => {
        console.log(e);
      }
    );

    const $ = cheerio.load(resp.text, { decodeEntities: false });
    let aHref = $(".listA");
    const _aList = [];
    const aLength = aHref.length;
    for (let i = 1; i < aLength; i = i + 2) {
      const oHref = aHref.eq(i);
      let href = $(oHref).attr("href");
      const ArticleID = forMat(href, "=");
      _aList.push(ArticleID);
    }
    _aList.reverse();
    aList = aList.concat(_aList);
    page--;
  }

  return aList;
}
function format(content) {
  const patt2 = /^[,]*/g;
  const patt1 = /&nbsp;|onload=\"resizepic\(this\)\"|<p><\/p>|<hr>|<p><br><\/p>/g;
  content = content.replace(patt1, "").replace(patt2, "");
  return content;
}
async function getDate(article, type, sql, sort) {
  let $ = null;
  try {
    $ = cheerio.load(article, { decodeEntities: false });
  } catch (error) {
    console.log(error);
    $ = false;
  }
  if (!$) return;
  let Data = {};
  const Article_tdbgall = $(".Article_tdbgall") || false;
  const patt3 = /\xa0/g;
  const patt1 = /<img [^>]*src=['"]([^'"]+)[^>]*>/;
  if (Article_tdbgall.length === 0) return;
  Data.author =
    Article_tdbgall.find("a")
      .eq(0)
      .text() || "佚名";
  Data.time = forMat(Article_tdbgall.text(), "更新时间：", "文章录入：");
  Data.browse = forMat(Article_tdbgall.text(), "点击数：", "更新时间：");
  Data.source =
    Article_tdbgall.find("a")
      .eq(1)
      .text() || "本站原创";
  Data.praise = 0;
  Data.type = type;

  $("#fontzoom")
    .find("#at_main")
    .remove();

  Data.content = await getImg($("#fontzoom").html());

  Data.summary = trimHtml(Data.content, {
    preserveTags: false,
    limit: 20
  }).html;
  Data.title = $(".main_ArticleTitle").text();
  if (Data.content !== null) {
    Data.content = Data.content.replace(patt3, "");
    if (Data.author !== null) Data.author = Data.author.replace(patt3, ",");

    if (Data.title !== null) Data.title = Data.title.replace(patt3, ",");

    if (Data.summary !== null)
      Data.summary =
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Data.summary.replace(patt3, "");
    Data.isbanner = 0;
    if (patt1.test(Data.content)) {
      Data.img = Data.content.match(patt1)[1];
    } else {
      Data.img = "0";
    }
    Data.content = format(Data.content);
    Data.sort = sort;
    await operateDB.saveArticle(sql, Data);
  }
}

/**
 *
 * @param {*} url 访问的路径
 * @param {*} type 需要爬的栏目ID
 */
async function startCrawl (sql,classId,page,type,sort){
    const aList = await getURL(classId,page);
    const LENGTH = aList.length;
    let done = 1;
    for(let i = 0; i < LENGTH;i++){
         
        let resp = await crawl(config.content, {ArticleID : aList[i]}).catch(e=>{
            throw e;
        });
        await getDate(resp.text,type,sql,sort);
        console.log(`已经爬了${done}条数据`);
        done++;
    }
    console.log("OK!")

}
async function startCrawll(sql, classId, page, type, sort) {
  let resp = await crawl(config.content, { ArticleID:35 }).catch(e => {
    throw e;
  });
  let content = resp.text;

  await getDate(content, type, sql, sort);
}
module.exports = startCrawl;

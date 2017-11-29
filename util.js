const superagent = require("superagent"),
  request = require("request"),
  charset = require("superagent-charset");

const baseHead = {
  // "Accept-Encoding":'gzip, deflate',
  // 'Accept-Language':'zh-CN,zh;q=0.9',
  "Content-Type": "application/x-www-form-urlencoded",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.109 Safari/537.36"
};

charset(superagent);
/**
*
* @param cookie 登录成功后返回的cookie
* @param url    需要访问的地址
* @param parma  所需参数
* @returns {Promise}
*/

module.exports = {
  crawl: (url = "", parma = {}) => {
    let dataStr = "";

    Object.keys(parma).forEach(key => {
      dataStr += key + "=" + parma[key] + "&";
    });

    if (dataStr !== "") {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
    }

    url = url + "?" + dataStr;

    return new Promise((resolve, reject) => {
      superagent
        .get(url)
        .charset("gb2312")
        .set(baseHead)
        .send(parma)
        .end((err, resp) => {
          if (err) {
            console.log(`err : ${err}`);
            reject(false);
          } else resolve(resp);
        });
    });
  },
  /**
* 
* @param {*} data 需要提取的内容 
* @param {*} start 截取字符串开始的下标，值为-1则截取至原字符串的末尾
* @param {*} end  截取字符串结束的下标，值为-1则截取至原字符串的末尾
*/
  forMat: (data, start, end = -1) => {
    data = data.replace(/\s/g, "");

    let result = null;
    const strlength = start === -1 ? 1 : start.length;
    if (end === -1) {
      result = data
        .substring(data.indexOf(start) + strlength)
        .replace(/\s/g, "");
    } else if (start === -1) {
      result = data.substring(0, data.indexOf(end)).replace(/\s/g, "");
    } else {
      result = data
        .substring(data.indexOf(start) + strlength, data.indexOf(end))
        .replace(/\s/g, "");
    }
    return result;
  }
};

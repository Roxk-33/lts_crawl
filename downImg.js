let superagent = require("superagent"),
request = require("request"),
fs = require("fs");
const crawl = require("./util").crawl;

/**
* 下载验证码用于tesseract检测、下载人头照
* 
* @param {string} url 请求图片的api 
* @param {string} cookie 
* @param {string} path  存放图片的路径
*/
module.exports = async(url, path) => {
  const options = {
    url,
    headers: {
      Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "zh-CN,zh;q=0.8",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.109 Safari/537.36",
      
    }
  };
  
  return new Promise((resolve, reject) => {
    request.get(url).on('response', function(response) {
      if(response.statusCode === 200){
        response.pipe(fs.createWriteStream(path)).on("close", () => {
          // 生成本地图片文件获取实际尺寸
          console.log(url,path + " 图片下载成功");
          resolve();
        })
      } // 200
      else{
        console.log(response.statusCode)
        console.log(url,path + " 图片下载失败");
      }
    }).on('error', function(err) {
      
      console.log(url,path + " 图片下载失败");
      resolve();
    })
    // .on("end", (response) => {
      
    //   request(options).pipe(fs.createWriteStream(path)).on("close", () => {
    //     // 生成本地图片文件获取实际尺寸
    //     console.log(url,path + " 图片下载成功");
    //     resolve();
    //   });
    // });
  });
}


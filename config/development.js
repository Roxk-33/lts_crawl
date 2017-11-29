module.exports = {
    
        // data : {
            //科研简讯
            // information : {
                sql : 'insert into articles SET ?',
                class : '31',
                type : '1',
                page : '33',
                sort : 'information',
            // },
    
            //媒体报道
            information : {
                sql : 'insert into articles SET ?',
                class : '28',
                type : '2',
                page : '31',
                sort : 'information'
                
            },
            //著作
            achievement : {
                sql : 'insert into articles SET ?',
                class : '34',
                type : '1',
                page : '3',
                sort : 'achievement'
                
            },
           //学术论文
            achievement : {
                sql : 'insert into articles set ?',
                class : '33',
                type : '2',
                page : '5',
                sort : 'achievement'
                
            },
            //研究报告
            achievement : {
                sql : 'insert into articles SET ?',
                class : '11',
                type : '3',
                page : '6',
                sort : 'achievement'
                
            },
          
            //课题研究
              research : {
                sql : 'insert into articles SET ?',
                class : '2',
                type : '1',
                page : '6',
                sort : 'research'
                
            },
            //调研考察
    
            //学术年会
            exchange : {
                sql : 'insert into articles SET ?',
                class : '36',
                type : '1',
                page : '4',
                sort : 'exchange'
                
            },
            //流通论坛
            exchange : {
                sql : 'insert into articles SET ?',
                class : '35',
                type : '2',
                page : '4',
                sort : 'exchange'
            },
            //来访交流
            
           
        // },
       
        catalog : 'http://lts.gdufe.edu.cn/Article/ShowClass.asp',
        content : 'http://lts.gdufe.edu.cn/Article/ShowArticle.asp',
       
    }
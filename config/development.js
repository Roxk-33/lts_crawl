module.exports = {
    
        data : [
            //科研简讯0
             {
                sql : 'insert into articles SET ?',
                class : '31',
                type : '1',
                page : '33',
                sort : 'information',
            },
    
            //媒体报道1
             {
                sql : 'insert into articles SET ?',
                class : '28',
                type : '2',
                page : '31',
                sort : 'information',
                
            },
            //著作2
             {
                sql : 'insert into articles SET ?',
                class : '34',
                type : '1',
                page : '3',
                sort : 'achievement',
                
            },
           //学术论文3
             {
                sql : 'insert into articles set ?',
                class : '33',
                type : '2',
                page : '5',
                sort : 'achievement',
                
            },
            //研究报告4
            {
                sql : 'insert into articles SET ?',
                class : '11',
                type : '3',
                page : '6',
                sort : 'achievement',
                
            },
          
            //课题研究5
              {
                sql : 'insert into articles SET ?',
                class : '2',
                type : '1',
                page : '6',
                sort : 'research',
                
            },
           
    
            //学术年会6
             {
                sql : 'insert into articles SET ?',
                class : '36',
                type : '1',
                page : '4',
                sort : 'exchange',
                
            },
            //流通论坛7
             {
                sql : 'insert into articles SET ?',
                class : '35',
                type : '2',
                page : '4',
                sort : 'exchange',
            },
            //来访交流
            
           
        ],
       
        catalog : 'http://lts.gdufe.edu.cn/Article/ShowClass.asp',
        content : 'http://lts.gdufe.edu.cn/Article/ShowArticle.asp',
       
    }
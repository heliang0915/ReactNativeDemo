
let Mock  = require('mockjs');
let Random = Mock.Random;
module.exports=()=> {
    var data = {
        books: []
    };
    for (var i = 1; i < 100; i++) {
        var content = Random.cparagraph(0,10);

        data.books.push({
            id: i,
            title:Random.ctitle(2,8),
            noRead: Random.integer(1,2),
            read: content.substr(0,40),
            updateTime: Random.time('yyyy-MM-dd hh:mm:ss'),
            updateContent:Random.cparagraph(1,6),
            image:(i%2==0)?"https://p1.duyao001.com/image/article/02c58f79f50c02774d53070276334be9_450x590.jpg":"https://p1.duyao001.com/image/article/8f58f50e5a151c35d53cfbe862ac9a65_450x590.jpg"
        })

    }

    return data
}
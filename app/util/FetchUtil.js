/**
 * AJAX发送工具类
 * User: heliang
 * Date: 2017/8/11.
 */

let  get=(url)=>{
    return new Promise((reslove,reject)=>{
        console.log(` %c FETCH LOG [GET][${url}]`,'color: #09a800')
        fetch(url).then((res)=>res.json()).then((json)=> {
            reslove(json)
        }).catch((err)=>{
            reject(err)
        });
    })
}
let  post=(url,params)=>{
    return new Promise((reslove,reject)=>{
        console.log(` %c FETCH LOG [POST][${url}]`,'color: #09a800')
        fetch(url,{
            headers: {
                'Cache-Control': 'no-cache'
            },
            body:params
        }).then((res)=>res.json()).then((json)=> {

            reslove(json);

        }).catch((err)=>{
            reject(err)
        });
    })
}

export {get,post}


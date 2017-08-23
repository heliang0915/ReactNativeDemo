import Storage from 'react-native-storage';
import {AsyncStorage} from  'react-native';
import {get,post} from  '../util/FetchUtil';

let storage=new Storage({
   //超过1000条数据循环存储
   size:1000,
    //存储引擎
    storageBackend: AsyncStorage,
    //过期时间
    defaultExpires: 1000 * 3600 * 24,
    //读写时在内存中缓存
    enableCache:true
})


var StorageUtil={
    save(key,data){
        storage.save({
            key,
            id:key,
            data
        })
    },
    setSync(key,url,param){
        storage.sync={
            [key](params){
                let {  resolve, reject } = params;
                console.log('缓存中没有从发送异步请求...'+key);
                get(url,param).then((json)=>{
                    resolve(json);
                    save(key,{
                        data:json
                    })
                }).catch((err)=>{
                    reject(err)
                })
            }
        }
    },
    get(key,cb){
       storage.load({
           key,
           id:key,
           autoSync:true,
           // syncInBackground(默认为true)意味着如果数据过期，
           // 在调用sync方法的同时先返回已经过期的数据。
           // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
           syncInBackground: true,

       }).then((rest)=>{
           // console.log(rest);
           cb(rest);
       })
    },
    removeKey(key){
        // storage.clearMapForKey('user');
        // storage.remove({
        //     key
        // });

        storage.remove({
            key,
            id: key
        });
    }
}
global.storage=storage;
export  default  StorageUtil;
import Realm from 'realm';
//定义章节表
const Chapter={
    name:'Chapter', //表名
    properties:{  //字段
       id:'string', //章节号
       content:'string' //章节分页后内容集合
    }
}

let realm=new Realm({
    schema:[Chapter]
})


let RealmUtil={
    //定义写入方法
    save(tableName,data,isUpdate){
        // let check=Object.prototype.toString.call;
        let isArray=Object.prototype.toString.call(data)=="[object Array]"
        realm.write(()=>{
            if(isArray){
                data.forEach((item)=>{
                    realm.create(tableName,data,isUpdate)
                })
            }else{
                realm.create(tableName,data,isUpdate)
            }
        })
    },
   //定义获取方法
    query(tableName,filter){
        let f="";
        let schemaList=null;
        if(filter){
            Object.keys(filter).forEach((key)=>{
                let val=filter[key];
                f+=key+"=="+val
            })
            // alert(tableName);
            schemaList=realm.objects(tableName);
            // alert("schemaList.length>>"+schemaList.length);
            // if(schemaList.length>0){
            //     alert(f);
            //     schemaList=schemaList.filtered(f);
            // }

        }else{
            schemaList=realm.objects(tableName)
        }
        return schemaList;
    },
    //删除数据
    remove(tableName,filter){
        let schemaList=this.query(tableName,filter);
        realm.write(() => {
            realm.delete(schemaList);
        });
    }

}

export default RealmUtil;





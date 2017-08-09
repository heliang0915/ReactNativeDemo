/**
 * 刷新列表容器
 * User: heliang
 * Date: 2017/8/3.
 */
import React,{Component} from 'react';
import {View,Text,FlatList} from 'react-native';
class RefreshList extends Component {
    state={
        list:[],
        refreshing:false,
        page:1,
        pageSize:12
    }
    shouldComponentUpdate(nextProps, nextState){
            console.log(nextState);
            return nextState.list.length!=this.state.list.length;
    }
    componentWillMount(){
         this.onRefresh();
    }
    getList(type){
        let {url,listField}=this.props;
        let {page,pageSize}=this.state;
        this.setState({
            refreshing:true
        })
        if(type=="refresh"){
            url+=`?_page=1&_limit=${pageSize}`;
        }else{
            page++;
            url+=`?_page=${page}&_limit=${pageSize}`;
            // alert(url);
        }
        fetch(url).then((res)=>res.json()).then((json)=>{
            let list=[];
            let obj=json;
            if(listField){
                obj= json[listField];
            }
            obj.forEach((item,index)=>{
                let json=item;
                json.key=index+parseInt(this.state.list.length);
                list.push(json);
            })
            if(type!="refresh"){
                list=this.state.list.concat(list);
            }
            console.log(list);
            this.setState({
                list,
                page:page,
                refreshing:false
            })
        })
    }

    renderItem=({item})=>{
        let {renderItem}=this.props;
        return renderItem.call(this,item);
    }
    emptyComponent(){
        return
        <View style={{height:'120%',backgroundColor:"#999"}}>
            <Text>没有数据</Text>
        </View>
    }
    onRefresh(){
        this.getList("refresh");
    }

    onEndReached(){
        this.getList();
    }
    render(){
        let {styles}=this.props;
        console.log('render>>>');
        return(
            <View style={{height:'97.5%'}}>
                <Text>
                    {this.state.list.length}
                </Text>
                <FlatList
                          extraData={this.state.list}
                          numColumns={3}
                          horizontal={false}
                          data={this.state.list}
                          renderItem={this.renderItem}
                    // ListHeaderComponent={this.renderHeader()}
                    // ListFooterComponent={this.renderFooter()}
                          ListEmptyComponent={this.emptyComponent()}
                          onEndReachedThreshold={0.8}
                          // onRefresh={this.onRefresh.bind(this)}
                          onEndReached={this.onEndReached.bind(this)}
                          initialNumToRender={9}
                          contentContainerStyle={styles}
                          refreshing={this.state.refreshing}

                />
            </View>
        )
    }
}
export default RefreshList;
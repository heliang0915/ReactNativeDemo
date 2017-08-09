/**
 *
 * User: heliang
 * Date: 2017/8/3.
 */

import React,{Component} from 'react';
import {View,Text,ScrollView,FlatList} from 'react-native';
// import RefreshList from '../../components/RefreshList';
// require('es6-promise').polyfill();
// require('isomorphic-fetch');

class SecondPage extends Component {

    // state={
    //     list:[],
    //     refreshing:false
    // }

    componentWillMount(){
        // alert("Test Will Mount");
        // let url="http://10.10.10.153:8080/index/";
        // fetch(url).then((res)=>res.json()).then((json)=>{
        //     let list=[];
        //     json.books.forEach((item,index)=>{
        //          let json=item;
        //          json.key=index;
        //          list.push(json);
        //     })
        //     this.setState({
        //         list
        //     })
        // })
    }


    renderItem(item){
        return <Text key={item.id}> {item.title}</Text>
    }

    // renderHeader(){
    //     return <Text>头部</Text>
    // }
    //
    // renderFooter(){
    //     return <Text>尾部</Text>
    // }
    //
    // emptyComponent(){
    //     return <Text>没有数据</Text>
    // }
    // onRefresh(){
    //     let _this=this;
    //     // alert('刷新');
    //     this.setState({
    //         refreshing:true
    //     })
    //     setTimeout(()=>{
    //         _this.setState({
    //             refreshing:false
    //         })
    //         alert('刷新');
    //     },1000)
    // }
    //
    // onEndReached(){
    //     alert('到达底部');
    // }

    render(){
        return(
            <View style={{height:'99%',backgroundColor:"#FFF"}}>
                <Text>
                    {this.props.navigation.state.params.id}----- Test
                </Text>
                {/*<RefreshList url="http://10.10.10.153:8080/index/"*/}
                             {/*listField="books"*/}
                             {/*renderItem={this.renderItem}>*/}
                {/*</RefreshList>*/}
                {/*<FlatList data={this.state.list}*/}
                          {/*renderItem={this.renderItem}*/}
                          {/*// ListHeaderComponent={this.renderHeader()}*/}
                          {/*// ListFooterComponent={this.renderFooter()}*/}
                          {/*ListEmptyComponent={this.emptyComponent()}*/}
                          {/*onEndReachedThreshold={.5}*/}
                          {/*onRefresh={this.onRefresh.bind(this)}*/}
                          {/*onEndReached={this.onEndReached.bind(this)}*/}
                          {/*initialNumToRender={1}*/}
                          {/*refreshing={this.state.refreshing}*/}
                {/*/>*/}
            </View>
        )
    }
}

export default SecondPage;
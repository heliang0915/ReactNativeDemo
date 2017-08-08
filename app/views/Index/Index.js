/**
 * 首页
 * User: heliang
 * Date: 2017/8/3.
 */
import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabBar from "../../components/TabBar";
import pxToDp from '../../util/pxToDp'

class Index extends Component {
   state={
       list:[{
           name:"张三"
       }]
   }
    // static  navigationOptions = ({navigation, screenProps}) => ({
    //     title: navigation.state.params == null ? "1" : navigation.state.params.title,
    //     headerLeft: (
    //         <Text style={{paddingLeft:4}} onPress={navigation.state.params == null ? () => {
    //         } : navigation.state.params.navigatePress.bind(this)}>
    //             返回
    //         </Text>
    //     ),
    //     headerRight: (
    //         <Text style={{paddingRight:4}} onPress={navigation.state.params == null ? () => {
    //         } : navigation.state.params.navigateNextPress.bind(this)}>
    //             下一步
    //         </Text>
    //     ),
    //     headerBackTitle:"返回",
    //     tabBarLabel: "首页",
    //     tabBarIcon: ({tintColor}) => (
    //         <Image
    //             source={require('../../assets/images/item-select.png')}
    //             style={[styles.icon, {tintColor: tintColor}]}
    //         />
    //     )
    // })
    //
    // componentDidMount() {
    //     this.props.navigation.setParams({
    //         title: '首页',
    //         navigatePress: this.navigatePress.bind(this),
    //         navigateNextPress:this.navigateNext.bind(this)
    //     })
    // }
    //
    // navigatePress() {
    //     let {navigation}=this.props;
    //     let {setParams,navigate}=navigation;
    //     // setParams({
    //     //     title:"切换"
    //     // })
    //     navigate('Test',{
    //         title:'哈哈'
    //     });
    // }
    //
    // navigateNext(){
    //     let {navigation}=this.props;
    //     let {navigate}=navigation;
    //     navigate('List',{
    //         title:'列表'
    //     });
    // }

    jumpToTest(){
      let {navigate} = this.props.navigation;
      navigate("IndexSecond",{
          id:"123"
      })
    }
    renderList(){
       let ary=[];
        this.state.list.forEach((item,index)=>{
            ary.push( <Text onPress={this.jumpToTest.bind(this)} key={index}>{item.name}</Text>)
        })
        return ary;
    }

    renderItemList(){
         let ary=[];
         for(var i=0;i<10;i++){
             ary.push(<View  key={i}  style={styles.bookItem}>
                 <Image style={styles.bookImg} resizeMode={Image.resizeMode.contain} source={require('../../assets/3.jpg')} />
             </View>);
         }
         return ary;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerInner}>
                    {this.renderItemList()}
                </View>
                {/*<Icon name="ios-trophy" size={30} color="#900" />*/}
                {/*<Text>首页</Text>*/}
                {/*{*/}
                   {/*this.renderList()*/}
                {/*}*/}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: '100%',
        backgroundColor: '#FFF'
    },
    containerInner:{
        marginTop:pxToDp(20),
        marginLeft:pxToDp(35),
        marginRight:pxToDp(35),
        flexWrap:"wrap",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    bookItem:{
        marginTop:pxToDp(40),
        height:pxToDp(241),
        width:pxToDp(185),
        // backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',

    },
    bookItemTxt:{
        color:'#FFF'
    },
    bookImg:{
        height:pxToDp(241),
        width:pxToDp(185),
    }

});
export default Index;
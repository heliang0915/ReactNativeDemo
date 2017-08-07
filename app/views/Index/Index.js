/**
 * 首页
 * User: heliang
 * Date: 2017/8/3.
 */
import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
    render() {
        return (
            <View style={styles.container}>
                <Icon name="ios-trophy" size={30} color="#900" />
                <Text>首页</Text>
                {
                   this.renderList()
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: '100%',
        backgroundColor: '#FFF',
    }
});
export default Index;
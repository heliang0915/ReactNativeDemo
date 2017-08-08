/**
 *  底部tab-bar
 * User: heliang
 * Date: 2017/7/21.
 */
import React, {Component} from 'react';
import {Text, StyleSheet,Navigator, View, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Me from '../views/Me/Me';
import {HomeNavigator,ChoiceNavigator,CategoryNavigator,RankNavigator} from '../views/Navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import pxToDp from '../util/pxToDp'
let tabBarMap=[{
    title:"书架",
    icon:"ios-trophy",
    badgeText:"1",
    index:1,
    size:pxToDp(24),
    component:HomeNavigator
},{
    title:"精选",
    icon:"ios-planet",
    badgeText:"1",
    index:2,
    size:pxToDp(28),
    component:ChoiceNavigator
},{
    title:"排行",
    icon:"ios-ribbon",
    badgeText:"1",
    index:3,
    size:pxToDp(28),
    component:RankNavigator
},{
    title:"分类",
    icon:"ios-pie",
    badgeText:"1",
    index:4,
    size:pxToDp(24),
    component:CategoryNavigator
},{
    title:"我的",
    icon:"ios-person",
    badgeText:"1",
    index:5,
    size:pxToDp(28),
    component:Me
}]


export default class TabBar extends Component {
    state = {
        selectedIndex: 1
    }
    //导航信息
    // static  navigationOptions = ({navigation, screenProps}) => ({
    //     // headerLeft: (
    //     //     <Text style={{paddingLeft:4}} onPress={navigation.state.params == null ? () => {
    //     //
    //     //     } :()=>{
    //     //
    //     //         let {navigate}=navigation;
    //     //         navigate('Test',{
    //     //             title:'哈哈'
    //     //         });
    //     //
    //     //     }}>返回</Text>
    //     // ),
    //
    //     headerRight: (
    //         <Text style={{paddingRight:4}} onPress={navigation.state.params == null ? () => {
    //         } : ()=>{
    //             let {navigate}=navigation;
    //             navigate('List',{
    //                 title:'列表'
    //             });
    //         }}>
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

    renderItem(item,i){
        let {title,icon,selectIcon,badgeText,index,component}=item;
        var Component=component;
        return(
            <TabNavigator.Item key={i}
                tabStyle={styles.tabItem}
                selected={this.state.selectedIndex == index}
                title={title}
                titleStyle={styles.tabText}
                renderIcon={() => <Icon name={item.icon} size={item.size} color="#ccc" />}
                renderSelectedIcon={() => <Icon name={item.icon} size={item.size} color="red" />}
                // badgeText={badgeText}
                onPress={() => this.setState({selectedIndex: index,title})}>
                <Component/>
            </TabNavigator.Item>
        )
    }


    renderTabList(){
        var tabList=[];
        tabBarMap.forEach((item,i)=>{
            tabList.push(this.renderItem(item,i));
        })
        return tabList;
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator tabBarStyle={styles.tab}>
                    {this.renderTabList()}
                </TabNavigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:'100%',
        // paddingTop:20,
        backgroundColor: '#FFF',
    },
    tab: {
        height: pxToDp(50),
        width:"100%",
        marginTop:5,
        marginBottom:5,
        backgroundColor: '#FFF',
        flex:1
    },
    tabItem:{
        // marginTop:10
    },
    tabText:{
        fontSize:pxToDp(12)
    }
    // ,
    // tabIcon: {
    //     width: 25,
    //     height: 25,
    //     marginTop: 0,
    //     marginBottom:0
    // },
    // selectedTabIcon: {
    //     width: 25,
    //     height: 25,
    //     marginTop: 0,
    //     color:"red",
    // }
});

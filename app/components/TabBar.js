// /**
//  *  底部tab-bar
//  * User: heliang
//  * Date: 2017/7/21.
//  */
// import React, {Component} from 'react';
// import {Text, StyleSheet,Navigator, View, Image} from 'react-native';
// import TabNavigator from 'react-native-tab-navigator';
// // import Index from '../views/Index';
// // import Choice from '../views/Choice';
// // import Rank from '../views/Rank';
// // import Category from '../views/Category';
// // import Me from '../views/Me';
//
// let tabBarMap=[{
//     title:"书架",
//     icon:"&#xe742;",
//     selectIcon:"&#xe742;",
//     badgeText:"1",
//     index:1,
//     // view:Index
// },{
//     title:"精选",
//     icon:"&#xe660;",
//     selectIcon:"&#xe660;",
//     badgeText:"1",
//     index:2,
//     // view:Choice
// },{
//     title:"排行",
//     icon:"&#xe660;",
//     selectIcon:"&#xe660;",
//     badgeText:"1",
//     index:3,
//     // view:Rank
// },{
//     title:"分类",
//     icon:"&#xe660;",
//     selectIcon:"&#xe660;",
//     badgeText:"1",
//     index:4,
//     // view:Category
// },{
//     title:"我的",
//     icon:"&#xe660;",
//     selectIcon:"&#xe660;",
//     badgeText:"1",
//     index:5,
//     // view:Me
// }]
//
//
// export default class TabBar extends Component {
//     state = {
//         selectedIndex: 1
//     }
//
//     renderItem(item,i){
//         let {title,icon,selectIcon,badgeText,index,view}=item;
//         console.log(view);
//         return(
//
//             <TabNavigator.Item key={i}
//                 selected={this.state.selectedIndex == index}
//                 title={title}
//                 renderIcon={() =>  <Image style={styles.tabIcon} source={require('../../assets/images/item.png')}  />}
//                 renderSelectedIcon={() => <Image style={styles.tabIcon} source={require('../../assets/images/item-select.png')}  />}
//                 // badgeText={badgeText}
//                 onPress={() => this.setState({selectedIndex: index})}>
//                 <View >
//                     <Text>12323</Text>
//                 </View>
//             </TabNavigator.Item>
//         )
//     }
//
//     renderTabList(){
//         var tabList=[];
//         tabBarMap.forEach((item,i)=>{
//             tabList.push(this.renderItem(item,i));
//         })
//         return tabList;
//     }
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <TabNavigator tabBarStyle={styles.tab}>
//                     {this.renderTabList()}
//                 </TabNavigator>
//             </View>
//         )
//     }
//
//
//
//
//
// }
//
// const styles = StyleSheet.create({
//     container: {
//         width:"100%",
//         height:'100%',
//         paddingTop:20,
//         backgroundColor: '#FFF',
//     },
//     tab: {
//         height: 50,
//         width:"100%",
//         marginBottom:10,
//         backgroundColor: '#FFF',
//         flex:1
//     },
//     tabIcon: {
//         width: 25,
//         height: 25,
//         marginTop: 0,
//         marginBottom:0
//     },
//     selectedTabIcon: {
//         width: 25,
//         height: 25,
//         marginTop: 0,
//         color:"red",
//     }
// });

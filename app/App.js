// /**
//  *
//  * User: heliang
//  * Date: 2017/8/3.
//  */
// import React, {Component} from 'react';
// import {
//     StackNavigator,
//     TabNavigator
// } from 'react-navigation';
//
// import TabBar from './components/TabBar';
// import {Image, StyleSheet,Button,Text} from 'react-native';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
// import Index from './views/index/Index';
// import Choice from './views/Choice';
// import Rank from './views/Rank';
// import Category from './views/Category';
// import Me from './views/Me';
// import List from './views/List';
// import Test from './views/Test';
//
// // let TabRouteConfigs = {
// //     Index: {
// //         screen: Index
// //     },
// //     Choice: {
// //         screen: Choice,
// //         navigationOptions: {
// //             headerTitle: "精选",
// //             tabBarLabel: "精选",
// //             tabBarIcon: ({tintColor}) => (
// //                 <Image
// //                     source={require('../assets/images/item-select.png')}
// //                     style={[styles.icon, {tintColor: tintColor}]}
// //                 />
// //             )
// //         }
// //     },
// //     Rank: {
// //         screen: Rank,
// //         navigationOptions: {
// //             headerTitle: "等级",
// //             tabBarLabel: "等级",
// //             tabBarIcon: ({tintColor}) => (
// //                 <Image
// //                     source={require('../assets/images/item-select.png')}
// //                     style={[styles.icon, {tintColor: tintColor}]}
// //                 />
// //             )
// //         }
// //     },
// //     Category: {
// //         screen: Category,
// //         navigationOptions: {
// //             headerTitle: "分类",
// //             tabBarLabel: "分类",
// //             tabBarIcon: ({tintColor}) => (
// //                 <Image
// //                     source={require('../assets/images/item-select.png')}
// //                     style={[styles.icon, {tintColor: tintColor}]}
// //                 />
// //             )
// //         }
// //     },
// //     Me: {
// //         screen: Me,
// //         navigationOptions: {
// //             headerTitle: "我的",
// //             tabBarLabel: "我的",
// //             tabBarIcon: ({tintColor}) => (
// //                 <Image
// //                     source={require('../assets/images/item-select.png')}
// //                     style={[styles.icon, {tintColor: tintColor}]}
// //                 />
// //             )
// //         }
// //     }
// // }
// // let TabNavigatorConfig = {
// //     tabBarPosition: 'bottom',
// //     swipeEnabled: true,
// //     lazy: true,
// //     tabBarOptions: {
// //         activeTintColor: '#e91e63'
// //     },
// //
// //     headerMode: 'float',
// //     transitionConfig:()=>({
// //         screenInterpolator:CardStackStyleInterpolator.forHorizontal,
// //     })
// // }
// // const Tabs = TabNavigator(TabRouteConfigs, TabNavigatorConfig);
// let AppRouteConfigs = {
//     Home: {
//         screen: TabBar,
//         navigationOptions: ({ navigation }) => ({
//             headerTitle: '11'
//         })
//     },
//     Test:{
//         screen: Test,
//         navigationOptions: ({ navigation }) => ({
//             headerTitle: `测试`,
//         })
//     },
//     List:{
//         screen: List,
//         navigationOptions: ({ navigation }) => ({
//             headerTitle: `列表`,
//         })
//     }
// }
// let AppNavigatorConfig = {
//     mode: "card",
//     headerMode: 'screen',
//     initialRouteParams: {
//         name: '123123'
//     }
// }
//
// const App = StackNavigator(AppRouteConfigs, AppNavigatorConfig);
// const styles = StyleSheet.create({
//     icon: {
//         height: 22,
//         width: 22,
//         resizeMode: 'contain'
//     }
// });
//
// export default App;
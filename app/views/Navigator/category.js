/**
 * 排行榜导航
 */
import React from 'react';
import {StackNavigator} from 'react-navigation';
import SecondPage from '../Index/SecondPage';
import {AppNavigatorConfig,NavOptions} from './commonConfig';
import Category from "../Category/Category";

let categoryOpt=Object.assign({},NavOptions,{
    headerTitle: '分类',
})
let secondOpt=Object.assign({},NavOptions,{
    headerTitle: '测试',
})

let AppRouteConfigs = {
    CategoryHome: {
        screen: Category,
        navigationOptions: categoryOpt
    },
    IndexSecond:{
        screen: SecondPage,
        navigationOptions: secondOpt
    }
}
const rank = StackNavigator(AppRouteConfigs, AppNavigatorConfig)
export default rank;


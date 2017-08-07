/**
 * 分类导航
 */
import React from 'react';
import {StackNavigator} from 'react-navigation';
import Rank from '../Rank/Rank';
import SecondPage from '../Index/SecondPage';
import {AppNavigatorConfig,NavOptions} from './commonConfig';

let rankOpt=Object.assign({},NavOptions,{
    headerTitle: '排行',
})
let secondOpt=Object.assign({},NavOptions,{
    headerTitle: '测试',
})

let AppRouteConfigs = {
    Home: {
        screen: Rank,
        navigationOptions: rankOpt
    },
    IndexSecond:{
        screen: SecondPage,
        navigationOptions: secondOpt
    }
}
const category = StackNavigator(AppRouteConfigs, AppNavigatorConfig)
export default category;


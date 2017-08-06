/**
 * 排行榜导航
 */
import React from 'react';
import {StackNavigator} from 'react-navigation';
import Choice from '../Choice/Choice';
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
        screen: Choice,
        navigationOptions: rankOpt
    },
    IndexSecond:{
        screen: SecondPage,
        navigationOptions: secondOpt
    }
}
const rank = StackNavigator(AppRouteConfigs, AppNavigatorConfig)
export default rank;


/**
 * 首页导航
 */
import React from 'react';
import {StackNavigator} from 'react-navigation';
import Index from '../Index/Index';
import SecondPage from '../Index/SecondPage';
import {AppNavigatorConfig,NavOptions} from './commonConfig';

let indexOpt=Object.assign({},NavOptions,{
    headerTitle: '首页',
})
let secondOpt=Object.assign({},NavOptions,{
    headerTitle: '测试',
})

let AppRouteConfigs = {
    Home: {
        screen: Index,
        navigationOptions: indexOpt
    },
    IndexSecond:{
        screen: SecondPage,
        navigationOptions: secondOpt
    }
}
const home = StackNavigator(AppRouteConfigs, AppNavigatorConfig)
export default home;


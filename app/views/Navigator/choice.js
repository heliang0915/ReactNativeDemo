/**
 * 精选导航
 */
import React from 'react';
import {StackNavigator} from 'react-navigation';
import Choice from '../Choice/Choice';
import SecondPage from '../Index/SecondPage';
import {AppNavigatorConfig,NavOptions} from './commonConfig';

let choiceOpt=Object.assign({},NavOptions,{
    headerTitle: '精选',
})
let secondOpt=Object.assign({},NavOptions,{
    headerTitle: '测试',
})

let AppRouteConfigs = {
    Home: {
        screen: Choice,
        navigationOptions: choiceOpt
    },
    IndexSecond:{
        screen: SecondPage,
        navigationOptions: secondOpt
    }
}
const choice = StackNavigator(AppRouteConfigs, AppNavigatorConfig)
export default choice;


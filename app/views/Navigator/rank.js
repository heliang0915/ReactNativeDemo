/**
 * 分类导航
 */
import React from 'react';
import {StackNavigator} from 'react-navigation';
import Choice from '../Choice/Choice';
import SecondPage from '../Index/SecondPage';
import {AppNavigatorConfig,NavOptions} from './commonConfig';

let categoryOpt=Object.assign({},NavOptions,{
    headerTitle: '分类',
})
let secondOpt=Object.assign({},NavOptions,{
    headerTitle: '测试',
})

let AppRouteConfigs = {
    Home: {
        screen: Choice,
        navigationOptions: categoryOpt
    },
    IndexSecond:{
        screen: SecondPage,
        navigationOptions: secondOpt
    }
}
const category = StackNavigator(AppRouteConfigs, AppNavigatorConfig)
export default category;


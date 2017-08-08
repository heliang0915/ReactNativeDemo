/**
 * 首页导航
 */
import React from 'react';
import {Text} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Index from '../Index/Index';
import SecondPage from '../Index/SecondPage';
import {AppNavigatorConfig,NavOptions} from './commonConfig';

let indexOpt=Object.assign({},NavOptions,{
    headerTitle: '首页',
})
let secondOpt=Object.assign({},NavOptions,{
    headerTitle: '测试',
    headerRight: (
            <Text style={{paddingRight:4,color:'#FFF'}} onPress={()=>{
                let {navigate}=this.props.navigation;
                navigate('List',{
                    title:'列表'
                });
            }}>
                下一步
            </Text>
        )
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


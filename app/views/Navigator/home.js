/**
 * 首页导航
 */
import React from 'react';
import {Text,StyleSheet,View,TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Index from '../Index/Index';
import SecondPage from '../Index/SecondPage';
import {AppNavigatorConfig,NavOptions} from './commonConfig';
import pxToDp from "../../util/pxToDp";
import Icon from 'react-native-vector-icons/Ionicons';

var styles=StyleSheet.create({
    textCss:{
        fontSize:pxToDp(40),
        color:"#FFF",
        marginLeft:pxToDp(40),
        marginRight:pxToDp(30)
    }
})

let indexOpt=Object.assign({},NavOptions,{
    headerTitle: '',
    headerLeft: (
        <Text style={styles.textCss}>
            我的书架
        </Text>
    ),
    headerRight: (

        <View style={{flexDirection:'row',marginRight:20}}>
            {/*<Text style={styles.textCss} onPress={()=>{*/}
                {/*let {navigate}=this.props.navigation;*/}
                {/*navigate('List',{*/}
                    {/*title:'列表'*/}
                {/*});*/}
            {/*}}>*/}
            <TouchableOpacity onPress={()=>{alert(1)}}>
                <Icon  name="ios-search-outline" size={pxToDp(58)} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>{alert(2)}}>
                <Icon name="ios-menu" size={pxToDp(58)} color="#FFF" />
            </TouchableOpacity>

            {/*</Text>*/}

        </View>


    )
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


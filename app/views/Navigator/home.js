/**
 *  首页所有跳转配置
 */
import React from 'react';
import {Text,StyleSheet,View,TouchableOpacity,TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Index from '../Index/Index';
import SecondPage from '../Index/SecondPage';
import Search from '../Index/Search';
import {AppNavigatorConfig,NavOptions} from './commonConfig';
import {pxToDp,deviceWidth} from "../../util/pxToDp";
import Icon from 'react-native-vector-icons/Ionicons';

var styles=StyleSheet.create({
    textCss:{
        fontSize:pxToDp(40),
        color:"#FFF",
        marginLeft:pxToDp(40),
        marginRight:pxToDp(30)
    }
})

let indexOpt=({navigation})=>Object.assign({},NavOptions,{
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
            <TouchableOpacity onPress={()=>{
                let {setParams,navigate}=navigation;
                // setParams({
                //      id:"123"
                // })
                navigate('Search',{
                    id:'哈哈'
                });

            }}>
                <Icon  name="ios-search-outline" size={pxToDp(58)} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:20}} onPress={()=>{alert(2)}}>
                <Icon name="ios-menu" size={pxToDp(58)} color="#FFF" />
            </TouchableOpacity>

            {/*</Text>*/}

        </View>
    )
})
let searchOpt=({navigation})=>Object.assign({},NavOptions,{
    headerTitle: '',
    headerRight: (
            <View style={{
                flexDirection:'row',
                // justifyContent:'flex-end',
                width:deviceWidth-70,
                alignItems:'center',
                // paddingLeft:pxToDp(100),
                // marginLeft:pxToDp(1100),
                // backgroundColor:"blue",
                marginRight:pxToDp(20)
            }}>
                <TextInput
                    ref="search"
                    placeholder="请输入..."
                    multiline={false}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#FFF"
                    autoFocus={false}
                    editable={true}
                    style={{
                        marginTop:5,
                        width:'90%',
                        padding:0,
                        // height:pxToDp(50),
                        // margin:0,
                        // backgroundColor:'yellow',
                        borderBottomWidth:0.5,
                        color:'#FFF',
                        borderBottomColor:'#FFF'
                    }}
                />
                <TouchableOpacity onPress={()=>{
                    let {setParams,navigate}=navigation;
                    alert(1);
                    // setParams({
                    //      id:"123"
                    // })
                    // navigate('Search',{
                    //     id:'哈哈'
                    // });

                }}>
                    <Icon  name="ios-search-outline"  size={pxToDp(58)} color="#FFF" />
                </TouchableOpacity>
            </View>
        )
})

let AppRouteConfigs = {
    Home: {
        screen: Index,
        navigationOptions: indexOpt
    },
    // IndexSecond:{
    //     screen: SecondPage,
    //     navigationOptions: secondOpt
    // },
    Search:{
        screen: Search,
        navigationOptions: searchOpt
    }
}
const home = StackNavigator(AppRouteConfigs, AppNavigatorConfig)


export default home;


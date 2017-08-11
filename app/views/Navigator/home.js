/**
 *  首页所有跳转配置
 */
import React from 'react';
import {Text,StyleSheet,View,TouchableOpacity,TextInput} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Index from '../Index/Index';
import Search from '../Index/Search';
import {AppNavigatorConfig,NavOptions,BooksReader} from './commonConfig';
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

//首页
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

//首页搜索页面
let searchOpt=({navigation})=>Object.assign({},NavOptions,{
    headerTitle: '',
    headerRight: (
            <View style={{
                flexDirection:'row',
                width:deviceWidth-70,
                alignItems:'center',
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
    Search:{
        screen: Search,
        navigationOptions: searchOpt
    },
    BooksReader
}
const nav = StackNavigator(AppRouteConfigs, AppNavigatorConfig)
export default nav;


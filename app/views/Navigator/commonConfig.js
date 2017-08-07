/**
 * Created by heliang on 2017/8/6.
 */
import {StyleSheet} from 'react-native';
// 先引入这个方法
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

let AppNavigatorConfig = {
    mode: "card",
    headerMode: 'screen',
    transitionConfig:()=>({
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    }),
    onTransitionStart:({scene})=>{
        // alert("start"+scene.route.routeName);
    },
    onTransitionEnd:({scene})=>{
        // alert("onTransitionEnd"+scene.route.routeName);
    }
}

let Style=StyleSheet.create({
    headerStyle:{
        backgroundColor:"#ff3131"
    },
    headerTitleStyle:{
        alignSelf:'center',
        fontWeight:'100',
        fontSize:15
    }
})
let NavOptions=Object.assign({},{
    headerTitle: '首页',
    headerBackTitle:null,
    headerStyle:Style.headerStyle,
    headerTitleStyle:Style.headerTitleStyle,
    headerTintColor:"#FFF",
    headerBack:{
      paddingLeft:-10
    },
    headerBackTitleStyle:{
        // fontSize:15
    }
})

export  {AppNavigatorConfig,NavOptions};
/**
 *
 */
// 先引入这个方法
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import commonStyle from '../../commonstyle/common';
import BookReader from '../../views/Book/BookReader';

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

// let Style=StyleSheet.create({
//     headerStyle:{
//         backgroundColor:"#ff3131"
//     },
//     headerTitleStyle:{
//         alignSelf:'center',
//         fontWeight:'100',
//         fontSize:pxToDp(15)
//     }
// })
let NavOptions=Object.assign({},{
    headerTitle: '首页',
    headerBackTitle:null,
    headerStyle:commonStyle.headerStyle,
    headerTitleStyle:commonStyle.headerTitleStyle,
    headerTintColor:"#FFF",
    headerBack:{
      paddingLeft:-10
    },
    headerBackTitleStyle:{
        // fontSize:15
    }
})


let bookOpt=({navigation})=>Object.assign({},NavOptions,{
    header:null
})

let BooksReader={
    screen: BookReader,
    navigationOptions: bookOpt
}


export  {AppNavigatorConfig,NavOptions,BooksReader};
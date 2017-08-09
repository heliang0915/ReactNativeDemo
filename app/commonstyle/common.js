import React,{Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import pxToDp from '../util/pxToDp'

let mainBg="#FFF";
let mainColor="#ff3131"; //主色调


const commonStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: '100%',
        backgroundColor: mainBg,
        flex:1
    },
    f14: {
        fontSize:pxToDp(32)
    },
    headerStyle:{
        backgroundColor:mainColor
    },
    headerTitleStyle:{
        alignSelf:'center',
        fontWeight:'100',
        fontSize:pxToDp(40)
    }
});

export  default commonStyle;
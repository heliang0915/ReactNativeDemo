import React,{Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import pxToDp from '../util/pxToDp'


const commonStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: '100%',
        backgroundColor: '#FFF',
    },
    f14: {
        fontSize:pxToDp(14)
    },
});

export  default commonStyle;
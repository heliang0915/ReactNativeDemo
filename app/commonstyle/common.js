import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {pxToDp} from '../util/pxToDp'

let mainBg = "#FFF";
let mainColor = "#fd3653"; //主色调


// let reader = {
//     readerTitle: {
//         fontSize: 12,
//         color: '#ccc'
//     },
//     readerContent: {
//         fontSize: 18,
//         color: "#999",
//         lineHeight: 34
//     }
// }

const commonStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: '100%',
        backgroundColor: mainBg,
        flex: 1,
    },
    f14: {
        fontSize: pxToDp(32)
    },
    headerStyle: {
        backgroundColor: mainColor
    },
    headerTitleStyle: {
        alignSelf: 'center',
        fontWeight: '100',
        fontSize: pxToDp(40)
    },
    readerTitle: {
        fontSize: 12,
        color: '#ccc'
    },
    readerContent: {
        fontSize: 18,
        color: "#999",
        lineHeight: 34
    }
});

export default commonStyle;
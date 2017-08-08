/**
 * 精选
 * User: heliang
 * Date: 2017/8/3.
 */
import React,{Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import commonStyle from '../../commonstyle/common';

class Choice extends Component {
    render(){
        return(
            <View style={commonStyle.container}>
                <Text  style={commonStyle.f14}>
                    精选
                </Text>
            </View>
        )
    }
}

export default Choice;
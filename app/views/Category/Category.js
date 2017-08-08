/**
 * 分类
 * User: heliang
 * Date: 2017/8/3.
 */
import React,{Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import commonStyle from '../../commonstyle/common';

class Category extends Component {
    render(){
        return(
            <View style={commonStyle.container}>
                <Text style={commonStyle.f14}>
                    分类
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: '100%',
        backgroundColor: '#FFF',
    }
});
export default Category;
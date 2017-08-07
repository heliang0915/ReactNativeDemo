/**
 * 我的
 * User: heliang
 * Date: 2017/8/3.
 */

import React,{Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';

class Me extends Component {

    render(){
        return(
            <View style={styles.container}>
                <Text>
                    我的11111
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
      backgroundColor:'#FFF'
    },
    icon: {
        width: 26,
        height: 26,
    },
});
export default Me;
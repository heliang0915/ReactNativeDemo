/**
 * 等级
 * User: heliang
 * Date: 2017/8/3.
 */
import React,{Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';

class Rank extends Component {

    render(){
        return(
            <View>
                <Text>
                    等级
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});
export default Rank;
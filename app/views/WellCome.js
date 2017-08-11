/**
 *
 * User: heliang
 * Date: 2017/8/11.
 */
import React, {Component} from 'react';
import  {View,Button,Text} from 'react-native';


class WellCome extends Component{
    render(){
        return (
            <View>
                <Text onPress={this.gotoNext.bind(this)}>11111</Text>
            </View>
        )
    }
    gotoNext(){
        let {navigation}=this.props;
        let {navigate}=navigation;
        navigate('Tab');
    }
}

export default WellCome;
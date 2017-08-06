/**
 *
 * User: heliang
 * Date: 2017/8/3.
 */

import React,{Component} from 'react';
import {View,Text} from 'react-native';

class SecondPage extends Component {
    componentWillMount(){
        // alert("Test Will Mount");
    }
    render(){
        return(
            <View>
                <Text>
                    {this.props.navigation.state.params.id}----- Test
                </Text>
            </View>
        )
    }
}

export default SecondPage;
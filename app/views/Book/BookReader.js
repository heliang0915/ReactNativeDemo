/**
 *
 * User: heliang
 * Date: 2017/8/11.
 */
import React, {Component} from 'react';
import  {View} from 'react-native';
import IReader from '../../components/IReader';

class BookReader extends Component{
    render(){
        return (
            <View>
                <IReader />
            </View>
        )
    }
}

export default BookReader;
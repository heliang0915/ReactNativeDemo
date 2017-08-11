/**
 * 搜索页面
 * User: heliang
 * Date: 2017/8/10.
 */
import React, {Component} from 'react';
import  {View,Text} from 'react-native';
import IReader from '../../components/IReader'

class Search extends Component{
    // componentDidMount(){
    //     alert(this.refs.search.isFocused());
    // }
    render(){
        return (
            <View>
                <IReader></IReader>
            </View>
        )
    }
}

export default Search;

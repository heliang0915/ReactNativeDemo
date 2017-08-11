/**
 * 精选导航
 */
import React from 'react';
import {StackNavigator} from 'react-navigation';
import BookReader from '../Book/BookReader';
import {AppNavigatorConfig,NavOptions} from './commonConfig';

let bookReaderOpt=Object.assign({},NavOptions,{
    headerTitle: '精选',
})

let AppRouteConfigs = {
    BookReader: {
        screen: BookReader,
        navigationOptions: bookReaderOpt
    }

}
const book = StackNavigator(AppRouteConfigs, AppNavigatorConfig)
export default book;


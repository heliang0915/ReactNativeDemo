/**
 *
 * User: heliang
 * Date: 2017/8/16.
 */
import React, {Component} from 'react';
import {WebView} from 'react-native';


class  MyWebView extends  Component{
  render(){
    return(
        <WebView source={{uri:"https://mobile.hotread.com/recommend/copyright"}}>
111
        </WebView>
    )
  }
}

export default MyWebView;
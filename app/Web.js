/**
 *
 * User: heliang
 * Date: 2017/8/16.
 */
import React, {Component} from 'react';
import {WebView} from 'react-native';
import RealmUtil from './util/RealmUtil';


class  MyWebView extends  Component{

  componentDidMount(){
      RealmUtil.remove('Chapter') ;
      [1,2,3].forEach((num)=>{

          let chapter={name:'123'};
          RealmUtil.save('Chapter',{
              id:'chapter' + num,
              content:JSON.stringify({chapter})
          },false);


      })

      setTimeout(()=>{
          let realmChapter=RealmUtil.query('Chapter',{id:'chapter' + 1});
           alert(JSON.stringify(realmChapter));

      },1000)
  }

  render(){
    return(
        <WebView source={{uri:"https://mobile.hotread.com/recommend/copyright"}}>
111
        </WebView>
    )
  }
}

export default MyWebView;
/**
 *  小说阅读器
 * User: heliang
 * Date: 2017/7/21.
 */
import React, {Component} from 'react';
import {Text,ScrollView, StyleSheet,FlatList, View, Image,BackHandler,ToastAndroid} from 'react-native';
import {deviceHeight, deviceWidth, pxToDp} from '../util/pxToDp';
import commonStyle from '../commonstyle/common';
import {get} from '../util/FetchUtil';

import {BOOK_INFO_URL,BOOK_CHAPTERS_URL,BOOK_CHAPTERS_CONTENT_URL} from '../api/ApIURL';

class IReader extends Component{
    state={
        characterContents:[]
    }
    getCharacter(){
        let bookId='58809e839a05e10e3625f046';
        let counter=0;
        let list=[];
        let reg=/第(\d+)章/;
        let inx=0;
        //获取书籍信息
        // let bookInfoURL=BOOK_INFO(bookId);
        // 获取所有章节
        let BOOKCHAPTERSURL=BOOK_CHAPTERS_URL(bookId);
        // get(bookInfoURL).then((bookInfo)=>{
            get(BOOKCHAPTERSURL).then(({mixToc})=>{
                let {chapters}=mixToc;
                // let pageSize=chapters.length>100000?chapters.length:100000;
                chapters.forEach((con,index)=>{
                    // if(pageSize>index){
                        let {link,title}=con;
                        let BOOKCHAPTERSCONTENTURL=BOOK_CHAPTERS_CONTENT_URL(link);
                        get(BOOKCHAPTERSCONTENTURL).then(({chapter})=>{
                            // console.log(title);
                            title.replace(reg,function(){
                                inx=RegExp.$1;
                            })
                            let {body}=chapter;
                            // body="";
                            // for(var i=0;i<1000;i++){
                            //     body+=" "+i+" ";
                            // }
                            counter++;
                            var ary=this._formatChapter(body)
                            ary.forEach((chunk,index)=>{
                                list.push({
                                    key:parseInt(inx)*1000+parseInt(index),
                                    characterName:title,
                                    characterContent:[chunk]
                                });
                            })
                            if(counter==chapters.length){
                                list.sort((a,b)=>{
                                    return a.key-b.key;
                                })

                                console.log(list);
                                this.setState({
                                    characterContents:list
                                })
                            }
                        })
                })
            })
        // })
    }

    _formatChapter(content, num, title) {
        let _arr =[]
        let _content = '\u3000\u3000' + content.replace(/\n/g, '@\u3000\u3000')
        let _arrTemp = this.contentFormat(_content)
        _arrTemp.forEach(function(element) {
            _arr.push(element)
        });
        return _arr
    }

    //
    contentFormat = (content) => {
        // alert(`${deviceWidth}*${deviceHeight}`);
        let fontCount = parseInt(deviceWidth / 18 - 2)
        let fontLines = parseInt((deviceHeight - 100) / 34)

        console.log("fontCount>>"+fontCount,"fontLines>>"+fontLines);
        const length = content.length
        let array = []
        let x = 0, y, m = 0
        while (x < length) {
            let _array = []
            for (var i = 0; i <= fontLines; i++) {
                let str = content.substring(x, x + fontCount)
                if (str.indexOf('@') != -1) {
                    y = x + str.indexOf('@') + 1
                    _array[i] = content.substring(x, y).replace('@', '')
                    x = y
                    continue
                } else {
                    y = x + fontCount
                    _array[i] = content.substring(x, y)
                    x = y
                    continue
                }
            }
            array[m] = _array
            m++
        }
        return array
    }
    //获取章节内容
    // getCharacterContent(chapter){
    //     let {link}=chapter;
    //     let BOOKCHAPTERSCONTENTURL=BOOK_CHAPTERS_CONTENT_URL(link);
    //     get(BOOKCHAPTERSCONTENTURL).then(({chapter})=>{
    //         let body=chapter;
    //         console.log(body);
    //
    //
    //     })
    // }

    componentDidMount(){
        this.getCharacter()
    }

    emptyComponent(){
        return
        <View style={{height:'120%',backgroundColor:"#999"}}>
            <Text>没有数据</Text>
        </View>
    }

    renderList(characterContent){
        let ary=[];
        characterContent[0].forEach((content,index)=>{
            ary.push(
                <View key={index}>
                    <Text  style={{
                    fontSize: 18,
                    color: "#604733",
                    lineHeight: 34
                     }}>
                        {content}
                    </Text>
                </View>
            )
        })
        return ary;
    }
    renderItem=({item})=>{
        // console.log('item>>>'+JSON.stringify(item));
        let {characterName,characterContent}=item;
        return (
            <View style={readerStyle.readerContent}>
                <Text style={commonStyle.readerTitle}>
                    {characterName}
                </Text>
                <View style={readerStyle.readerContentInner}>
                    {this.renderList(characterContent)}
                </View>
            </View>
        )
    }
    render(){
        return(
            <Image source={require('../assets/read_bg.jpg')} style={readerStyle.readerBg} >
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
            >
                <FlatList
                    extraData={this.state.characterContents}
                    numColumns={1}
                    horizontal={true}
                    data={this.state.characterContents}
                    renderItem={this.renderItem}
                    // ListHeaderComponent={this.renderHeader()}
                    // ListFooterComponent={this.renderFooter()}
                    ListEmptyComponent={this.emptyComponent()}
                    initialNumToRender={9}
                    // contentContainerStyle={readerStyle.readerContent}
                />
            </ScrollView>
            </Image>
        )
    }
}

const readerStyle = StyleSheet.create({
    readerBg:{
        width:deviceWidth,
        height:deviceHeight
    },
    readerContent:{
        width:deviceWidth,
        height:deviceHeight,
        flex: 1,
        // flexDirection:"row",
        // justifyContent: 'center',
        // backgroundColor:'red'
        // alignItems: ''

    },
    readerContentInner:{
        // flex: 1,
        // marginRight:20,
        // height:deviceHeight-300,
        paddingLeft:pxToDp(30),
        // backgroundColor:'blue',
        paddingRight:pxToDp(30)
        // ,
        // marginTop:-100
        // ,
        // backgroundColor:'blue'
    }
});


export default  IReader;
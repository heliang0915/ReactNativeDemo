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
                            let {body}=chapter;
                            counter++;

                            list.push({
                                key:counter,
                                characterName:title,
                                characterContent:[body]
                            });
                            if(counter==chapters.length){
                                list.sort((a,b)=>{
                                    return a.key-b.key;
                                })
                                this.setState({
                                    characterContents:list
                                })
                            }
                        })
                    // }
                })
            })
        // })
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
        characterContent.forEach((content,index)=>{
            ary.push(
                <Text key={index} style={{
                    fontSize: 18,
                    color: "#999",
                    lineHeight: 34
                }}>
                    {content}
                </Text>
            )
        })
        return ary;
    }
    renderItem=({item})=>{
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
        backgroundColor:'red'
        // alignItems: ''

    },
    readerContentInner:{
        // flex: 1,
        // marginRight:20,
        // height:deviceHeight-300,
        paddingLeft:pxToDp(30),
        backgroundColor:'blue',
        paddingRight:pxToDp(30)
        // ,
        // marginTop:-100
        // ,
        // backgroundColor:'blue'
    }
});


export default  IReader;
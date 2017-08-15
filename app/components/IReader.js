/**
 *  小说阅读器
 * User: heliang
 * Date: 2017/7/21.
 */
import React, {Component} from 'react';
import {Text, ScrollView,StatusBar, StyleSheet,FlatList, View, Image} from 'react-native';
import {deviceHeight, deviceWidth, pxToDp} from '../util/pxToDp';
import {_formatChapter, _contentFormat} from '../util/FromateUtil';
import commonStyle from '../commonstyle/common';
import {get} from '../util/FetchUtil';
import {toastShort} from '../util/ToashUtil'

console.log(_formatChapter);

import {BOOK_INFO_URL, BOOK_CHAPTERS_URL, BOOK_CHAPTERS_CONTENT_URL} from '../api/ApIURL';

class IReader extends Component {
    constructor(props) {
        super(props);
        this.bookId='58809e839a05e10e3625f046';
        this.chapterPageSize = 0;// 每个章节最终分为几页
        this.currentChapter=0;
    }

    state = {
        characterContents: [],
        loading:false
    }
    //获取指定书籍的指定章节
    getCharacter(bookId, num) {
        // let counter=0;
        let list =[] ;
        let reg = /第(\d+)章/;
        let inx = 0;
        let counter=0;
        this.setState({
            loading:true
        });
        // 获取所有章节
        // console.time('耗时')
        this.currentChapter=num;
        let BOOKCHAPTERSURL = BOOK_CHAPTERS_URL(bookId);
        get(BOOKCHAPTERSURL).then(({mixToc}) => {
            let {chapters} = mixToc;

            chapters.forEach((con)=>{
                let {link, title} = con;//[num];
                let BOOKCHAPTERSCONTENTURL = BOOK_CHAPTERS_CONTENT_URL(link);
                get(BOOKCHAPTERSCONTENTURL).then(({chapter}) => {
                    title.replace(reg, function () {
                        inx = RegExp.$1;
                    })
                    let {body} = chapter;
                    var ary = _formatChapter(body);
                    this.chapterPageSize=this.state.characterContents.concat(ary).length;
                    ary.forEach((chunk, index) => {
                        list.push({
                            key: parseInt(inx) * 1000 + parseInt(index),
                            characterName: title,
                            characterContent: [chunk]
                        });
                    })
                    counter++;
                    if(counter==chapters.length){
                        list= this.state.characterContents.concat(list);
                        list.sort((a, b) => {
                            return a.key - b.key;
                        })
                        this.setState({
                            characterContents:list,
                            loading:false
                        })
                    }


                })
            })

        })
    }

    componentDidMount() {
        this.getCharacter(this.bookId, 0);
    }

    emptyComponent() {
        return
        <View style={{height: '120%', backgroundColor: "#999"}}>
            <Text>没有数据</Text>
        </View>
    }

    renderList(characterContent) {
        let ary = [];
        characterContent[0].forEach((content, index) => {
            ary.push(
                <View key={index}>
                    <Text style={{
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

    renderItem = ({item}) => {
        let {characterName, characterContent} = item;
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

    _scrollEnd(env){
        let {x}=env.nativeEvent.contentOffset;
        let maxWidth=(this.chapterPageSize-1)*deviceWidth-300;
        //加载下一个章节信息
        if(x>maxWidth){
            // alert("加载下一章节");
            this.currentChapter+=1;
            this.getCharacter(this.bookId,this.currentChapter);
        }

        if(x==0){
            // ToastAndroid.show('已经是第一页',ToastAndroid.SHORT)
            toastShort('已经是第一页');
        }
        console.log(x);
    }


    //获取章节信息
    // getChapterData(){
    //
    // }


    renderLoading(){
        return (
            <View style={[readerStyle.loadingView]}>
                <View style={readerStyle.loadingInnerView}>
                    <Image  style={{height: 40, width: 40, marginTop: 10, marginBottom: 10}}
                           source={require('../assets/loadding.gif')}/>
                    <Text style={readerStyle.loadingTxt}>加载中...</Text>
                </View>
            </View>
        )
    }

    render() {
        // alert(this.state.loading==true);
        return (

                <Image source={require('../assets/read_bg.jpg')} style={readerStyle.readerBg}>
                    {
                        (this.state.loading==true) ?this.renderLoading():null
                    }
                    {/*<StatusBar*/}
                        {/*backgroundColor="blue"*/}
                        {/*barStyle="light-content"*/}
                    {/*/>*/}
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={true}
                        scrollEventThrottle={800}
                        onMomentumScrollEnd={this._scrollEnd.bind(this)}
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
    readerBg: {
        width: deviceWidth,
        height: deviceHeight
    },
    readerContent: {
        width: deviceWidth,
        height: deviceHeight,
        flex: 1,
        // flexDirection:"row",
        // justifyContent: 'center',
        // backgroundColor:'red'
        // alignItems: ''

    },
    loadingView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        height: deviceHeight,
        position: 'absolute',
        zIndex:3
    },
    loadingInnerView: {
        height: pxToDp(250),
        width: pxToDp(250),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        opacity:1
    },
    loadingAnimate: {
        borderWidth: 5,
        height: 50,
        width: 50,
        // borderRadius:50,
        backgroundColor: "#000",
        borderColor: '#FFF',
        borderStyle: 'solid'
    },
    loadingTxt: {
        fontSize: pxToDp(30),
        textAlign: 'center',
        color: "#FFF",
        paddingLeft: 10
    },
    readerContentInner: {
        // flex: 1,
        // marginRight:20,
        // height:deviceHeight-300,
        paddingLeft: pxToDp(30),
        // backgroundColor:'blue',
        paddingRight: pxToDp(30)
        // ,
        // marginTop:-100
        // ,
        // backgroundColor:'blue'
    }
});


export default IReader;
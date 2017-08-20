/**
 *  小说阅读器
 * User: heliang
 * Date: 2017/7/21.
 */
import React, {Component} from 'react';
import {Text, ScrollView, StatusBar, StyleSheet, FlatList, View, Image} from 'react-native';
import {deviceHeight, deviceWidth, pxToDp} from '../util/pxToDp';
import {_formatChapter, _contentFormat} from '../util/FromateUtil';
import commonStyle from '../commonstyle/common';
import {get} from '../util/FetchUtil';
import Toash from '../util/ToashUtil'
import RealmUtil from '../util/RealmUtil'
import StorageUtil from '../util/StaticStore'
import {BOOK_CHAPTERS_URL, BOOK_CHAPTERS_CONTENT_URL} from '../api/ApIURL';

class IReader extends Component {
    constructor(props) {
        super(props);
        this.bookId = '58809e839a05e10e3625f046';
        this.allCharacter = [];
        this.chapterPageSize = 0;// 每个章节最终分为几页
        this.currentChapter = 0;
        this.chapterMap = {};
        this.currentChapterPageSize = 0;
        this.chapterLinks=[];
        this.tableName="Chapter";
    }

    state = {
        characterContents: [],
        loading: false,
        chapterLinks: []
    }


    loadTwoPageData(num, type) {
        let next = 0;
        let pre = 0;
        num = parseInt(num);
        if (type == undefined) {
            if (num == 0) {
                next = num + 2;
                pre=num+1;
            } else if (num == this.state.chapterLinks.length - 1) {
                next = this.state.chapterLinks.length - 1;
                pre = next - 1;
            } else {
                next = num + 1;
                pre = num - 1;
            }
        } else if (type == "next") {
            if (num == this.state.chapterLinks.length - 1) {
                next = this.state.chapterLinks.length - 1;
                pre = -1;
            } else {
                pre = num + 1;
                next = pre + 1;
            }
        }
        let scrollView = this.refs.sv;
        // console.time('耗时')
        this.getCharacter(num, () => {
            setTimeout(()=>{
                this.getCharacter(next, () => {
                    // this.getCharacter(pre, () => {
                    //     let key = Object.keys(this.chapterMap)[0];
                    //     let val = this.chapterMap[key];
                    //     if (type == 'next') {
                    //
                    //         if (num <= Object.keys(this.chapterMap).length - 3) {
                    //             val = parseInt(this.chapterMap[Object.keys(this.chapterMap)[num]]) + parseInt(this.chapterMap[Object.keys(this.chapterMap)[num + 1]]) + parseInt(this.chapterMap[Object.keys(this.chapterMap)[num + 2]]);
                    //         } else {
                    //             val = parseInt(this.chapterMap[Object.keys(this.chapterMap)[num]]) + parseInt(this.chapterMap[Object.keys(this.chapterMap)[num + 1]]) + parseInt(this.chapterMap[Object.keys(this.chapterMap)[num + 2]]);
                    //         }
                    //     }
                    //
                    //     if (type == undefined &&num>0 || type == 'pre') {
                    //         setTimeout(() => {
                    //             scrollView.scrollTo({
                    //                 x: (val) * deviceWidth,
                    //                 y: 0,
                    //                 animated: false
                    //             })
                    //         })
                    //     }
                    //
                    //     // console.timeEnd('耗时')
                    //
                    // });
                })
            },10000)

        });
    }
    //获取书的所有章节
    getAllCharacter() {
        let BOOKCHAPTERSURL = BOOK_CHAPTERS_URL(this.bookId);
        this.setState({
            loading: true
        })
        StorageUtil.setSync('chapterLinks', BOOKCHAPTERSURL, {}, 'chapter')
        StorageUtil.get('chapterLinks', ({mixToc}) => {
            let {chapters} = mixToc;
            this.chapterLinks=chapters;
            StorageUtil.save('chapterLinks' , {mixToc:{chapters}});
            this.loadTwoPageData(0);
        });
    }


    getCharacterInner(chapters,chapter,num,cb){
        let list = [];
        let inx = 0;
        let reg = /第(\d+)章/;
        let {title} = chapters[num];
        title.replace(reg, function () {
            inx = RegExp.$1;
        })
        let {body} = chapter;
        var ary = _formatChapter(body);
        this.chapterPageSize = this.state.characterContents.concat(ary).length;
        ary.forEach((chunk, index) => {
            list.push({
                key: parseInt(num) * 1000 + parseInt(index),
                characterName: title,
                characterContent: [chunk]
            });
        })
        list = this.state.characterContents.concat(list);
        list.sort((a, b) => {
            return a.key - b.key;
        })
        this.setState({
            characterContents: list,
            loading: false
        }, () => {
            console.log(cb);
            cb != undefined ? cb() : null;
        })
    }
    //获取指定书籍的指定章节
    getCharacter(num, cb) {
        if(num>=0){
            this.currentChapter = num;
            let chapters = this.chapterLinks;
            let {link} = chapters[num];
            let BOOKCHAPTERSCONTENTURL = BOOK_CHAPTERS_CONTENT_URL(link);
            // alert(1);
            // RealmUtil.remove(this.tableName)
            let realmChapter=RealmUtil.query(this.tableName,{id:'chapter' + num});
            alert("realmChapter.length>>>"+realmChapter.length);
            if(realmChapter.length>0&&realmChapter[num]){
                //本地缓存中有数据
                alert("本地缓存中有数据>>"+num);
                // let {content}=realmChapter[num];
                // let {chapter}=JSON.parse(content);
                // this.getCharacterInner(chapters,chapter,num,cb);
                // RealmUtil.remove('Chapter')
            }else{
                get(BOOKCHAPTERSCONTENTURL).then(({chapter}) => {
                    RealmUtil.save(this.tableName,{
                        id:'chapter' + num,
                        content:JSON.stringify({chapter})
                    },false);
                    alert('发送ajax----'+'chapter' + num);
                    // RealmUtil.remove('Chapter')
                     this.getCharacterInner(chapters,chapter,num,cb);
                })
            }
            // StorageUtil.removeKey('chapter' + num);
            // StorageUtil.setSync('chapter' + num, BOOKCHAPTERSCONTENTURL, {}, 'chapter')
            // StorageUtil.get('chapter' + num, ({chapter}) => {
            //     let {title} = chapters[num];
            //     title.replace(reg, function () {
            //         inx = RegExp.$1;
            //     })
            //     StorageUtil.save('chapter' + num, {chapter});
            //     let {body} = chapter;
            //     var ary = _formatChapter(body);
            //     this.chapterPageSize = this.state.characterContents.concat(ary).length;
            //     this.currentChapterPageSize = ary.length;
            //     ary.forEach((chunk, index) => {
            //         list.push({
            //             key: parseInt(num) * 1000 + parseInt(index),
            //             characterName: title,
            //             characterContent: [chunk]
            //         });
            //     })
            //     this.chapterMap[inx - 1] = ary.length;
            //     list = this.state.characterContents.concat(list);
            //     list.sort((a, b) => {
            //         return a.key - b.key;
            //     })
            //     this.setState({
            //         characterContents: list,
            //         loading: false
            //     }, () => {
            //         cb != undefined ? cb() : null;
            //     })
            // })
        }else{
            Toash.toastShort('已经是第一页');
        }
    }

    componentDidMount() {
        // RealmUtil.save('Chapter',{
        //     id:'1',
        //     content:'内容'
        // },true);
        // let list=RealmUtil.query('Chapter');
        // RealmUtil.remove('Chapter')
        // alert(JSON.stringify(list));
        // RealmUtil.remove('Chapter')
        this.getAllCharacter();
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

    renderItem = ({item, index}) => {
        let {characterName, characterContent} = item;
        return (
            <View style={readerStyle.readerContent}>
                <Text style={commonStyle.readerTitle}>
                    {characterName}-----{index}
                </Text>
                <View style={readerStyle.readerContentInner}>
                    {this.renderList(characterContent)}
                </View>
            </View>
        )
    }

    _scrollEnd(env) {
        let {x} = env.nativeEvent.contentOffset;
        let maxWidth = (this.chapterPageSize - 1) * deviceWidth - 300;
        //加载下一个章节信息
        if (x > maxWidth) {
            console.log("加载下一章节");
            let next = parseInt(Object.keys(this.chapterMap)[Object.keys(this.chapterMap).length - 1]) + 1;
            // this.getCharacter(next);
            if (next < this.chapterPageSize) {
                this.loadTwoPageData(next, 'next');
            }
        }
        // console.log(x);
        if (x == 0 && this.currentChapter == 0) {
            Toash.toastShort('已经是第一页');
        }
        //向前翻页 加载章节
        if (x == 0 && this.currentChapter != 0) {
            console.log("加载上一章节");
            console.log(this.chapterMap);
            let scrollView = this.refs.sv;
            let pre = parseInt(Object.keys(this.chapterMap)[0]) - 1;
            console.log(this.chapterMap);
            this.getCharacter(pre, () => {
                let page = Object.keys(this.chapterMap).length == 2 ? this.currentChapterPageSize - 1 : this.currentChapterPageSize;
                let myX = (page) * deviceWidth;
                scrollView.scrollTo({
                    x: myX,
                    y: 0,
                    animated: false
                })
            });
        }
    }

    renderLoading() {
        return (
            <View style={[readerStyle.loadingView]}>
                <View style={readerStyle.loadingInnerView}>
                    <Image style={{height: 40, width: 40, marginTop: 10, marginBottom: 10}}
                           source={require('../assets/loadding.gif')}/>
                    <Text style={readerStyle.loadingTxt}>奋力加载中...</Text>
                </View>
            </View>
        )
    }

    render() {
        console.log('render...');
        return (
            <View>
                <StatusBar
                    hidden={true}
                    translucent={true}
                    showHideTransition={'slide'}
                    barStyle={'light-content'}/>

                <Image source={require('../assets/read_bg.jpg')} style={readerStyle.readerBg}>
                    {
                        (this.state.loading == true) ? this.renderLoading() : null
                    }

                    <ScrollView
                        ref="sv"
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
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
            </View>

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
        flex: 1
    },
    loadingView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        height: deviceHeight,
        position: 'absolute',
        zIndex: 3
    },
    loadingInnerView: {
        height: pxToDp(250),
        width: pxToDp(250),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        opacity: 1
    },
    loadingAnimate: {
        borderWidth: 5,
        height: 50,
        width: 50,
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
        paddingLeft: pxToDp(30),
        paddingRight: pxToDp(30)
    }
});


export default IReader;
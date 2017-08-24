/**
 *  小说阅读器
 * User: heliang
 * Date: 2017/7/21.
 */
import React, {Component} from 'react';
import {Text, ScrollView, Animated, StatusBar, StyleSheet, TouchableOpacity, FlatList, View, Image} from 'react-native';
import {deviceHeight, deviceWidth, pxToDp} from '../util/pxToDp';
import {_formatChapter, _contentFormat} from '../util/FromateUtil';
import commonStyle from '../commonstyle/common';
import {get} from '../util/FetchUtil';
import Toash from '../util/ToashUtil'
// import RealmUtil from '../util/RealmUtil'
import StorageUtil from '../util/StaticStore'
import {BOOK_CHAPTERS_URL, BOOK_CHAPTERS_CONTENT_URL} from '../api/ApIURL';
import Icon from 'react-native-vector-icons/Ionicons';

class IReader extends Component {
    constructor(props) {
        super(props);
        this.bookId = '58809e839a05e10e3625f046';
        this.allCharacter = [];
        this.chapterPageSize = 0;// 每个章节最终分为几页
        this.currentChapter = 0;
        this.chapterMap = {};
        this.currentChapterPageSize = 0;
        this.chapterLinks = [];
        this.tableName = "Chapter";
    }

    state = {
        characterContents: [],
        loading: false,
        chapterLinks: [],
        showBar: false,
        showChapter: false,
        translateX: new Animated.Value(2 * deviceWidth),
        opacity: new Animated.Value(0)
    }

    loadTwoPageData(num, type) {
        let next = 0;
        let pre = 0;
        num = parseInt(num);
        if (type == undefined) {
            if (num == 0) {
                next = num + 2;
                pre = num + 1;
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
        this.getCharacter(num, () => {
            this.getCharacter(next, () => {
                this.getCharacter(pre, () => {

                })
            })
        });
    }

    //获取书的所有章节
    getAllCharacter() {
        let BOOKCHAPTERSURL = BOOK_CHAPTERS_URL(this.bookId);
        StorageUtil.setSync('chapterLinks', BOOKCHAPTERSURL, {}, 'chapter')
        StorageUtil.get('chapterLinks', ({mixToc}) => {
            let {chapters} = mixToc;
            this.chapterLinks = chapters;
            StorageUtil.save('chapterLinks', {mixToc: {chapters}});
            // let history = RealmUtil.query("HistoryChapter");
            this.setState({
                loading: true
            })
            // if (history && Object.keys(history).length) {
            //     let {id} = history[0];
            //     this.loadTwoPageData(id != undefined && id > 1 ? (id - 2) : 0);
            // } else {
            this.loadTwoPageData(0);
            // }
        });
    }

    getCharacterInner(chapters, chapter, num, cb) {

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
        this.chapterMap[inx - 1] = ary.length;
        this.currentChapterPageSize = ary.length;
        list = this.state.characterContents.concat(list);
        list.sort((a, b) => {
            return a.key - b.key;
        })
        this.setState({
            characterContents: list,
            loading: false
        }, () => {
            // console.log(cb);
            cb != undefined ? cb() : null;
        })
    }

    //获取指定书籍的指定章节
    getCharacter(num, cb) {
        if (num >= 0) {
            // RealmUtil.remove("HistoryChapter");
            this.currentChapter = num;
            let chapters = this.chapterLinks;
            let {link} = chapters[num];
            let BOOKCHAPTERSCONTENTURL = BOOK_CHAPTERS_CONTENT_URL(link);
            // let realmChapter = RealmUtil.query(this.tableName, {id: 'chapter' + num});
            // if (realmChapter.length > 0 && realmChapter[num]) {
            //     //本地缓存中有数据
            //     // alert('从缓存中取值');
            //     let {content} = realmChapter[num];
            //     let {chapter} = JSON.parse(content);
            //     this.getCharacterInner(chapters, chapter, num, cb);
            // } else {
            get(BOOKCHAPTERSCONTENTURL).then(({chapter}) => {
                // RealmUtil.save(this.tableName, {
                //     id: 'chapter' + num,
                //     content: JSON.stringify({chapter})
                // }, false);
                // alert('发送ajax----'+'chapter' + num);
                this.getCharacterInner(chapters, chapter, num, cb);
            })
            // }
            // RealmUtil.remove("HistoryChapter");
            // RealmUtil.save("HistoryChapter",{id:this.currentChapter.toString()},false);
        } else {
            Toash.toastShort('已经是第一页');
        }
    }

    componentDidMount() {
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
            <TouchableOpacity activeOpacity={1} style={readerStyle.readerContent}
                              onPress={this.changeBarState.bind(this, true)}>
                <View>
                    <Text style={commonStyle.readerTitle}>
                        {characterName}
                    </Text>
                    <View style={readerStyle.readerContentInner}>
                        {this.renderList(characterContent)}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _scrollEnd(env) {
        let {x} = env.nativeEvent.contentOffset;
        let maxWidth = (this.chapterPageSize - 1) * deviceWidth - 300;
        //加载下一个章节信息
        if (x + (parseInt(this.currentChapter) * 10 * deviceWidth) > maxWidth) {
            let next = parseInt(Object.keys(this.chapterMap)[Object.keys(this.chapterMap).length - 1]) + 1;
            this.loadTwoPageData(next, 'next');
        }
        // console.log(x);
        if (x == 0 && this.currentChapter == 0) {
            Toash.toastShort('已经是第一页');
        }
        //向前翻页 加载章节
        if (x == 0 && this.currentChapter != 0) {
            console.log("加载上一章节");
            let scrollView = this.refs.sv;
            let pre = parseInt(Object.keys(this.chapterMap)[0]) - 1;
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
        return (
            <View>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                    animated={true}
                />
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
                {this.state.showBar ? this.renderBar() : null}
                {this.chapterView()}
            </View>
        )
    }

    //改变工具栏状态
    changeBarState(state) {
        this.setState({
            showBar: state
        })
    }

    //显示上下工具栏
    renderBar() {
        return (
            <View style={readerStyle.barView}>
                <View style={readerStyle.barTop}>
                    <TouchableOpacity style={readerStyle.barBack} onPress={() => alert('返回')}>
                        <Icon name="ios-arrow-back" size={pxToDp(48)} style={readerStyle.barTopLeft} color="#FFF"/>
                    </TouchableOpacity>
                    <View style={readerStyle.barTopRight}>
                        <Text style={readerStyle.barTxt}>社区</Text>
                        <Text style={readerStyle.barTxt}>简介</Text>
                    </View>
                </View>
                <Text style={readerStyle.barCenter} onPress={this.changeBarState.bind(this, false)}/>
                <View style={readerStyle.barBottom}>
                    <View style={readerStyle.barBottomInnerView}>
                        <TouchableOpacity style={readerStyle.barBottomInnerView} onPress={() => alert('夜间')}>
                            <Icon name="ios-moon" size={pxToDp(28)} style={readerStyle.barTopLeft} color="#FFF"/>
                            <Text style={readerStyle.barBottomTxt}>夜间</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={readerStyle.barBottomInnerView}>
                        <TouchableOpacity style={readerStyle.barBottomInnerView} onPress={() => alert('设置')}>
                            <Icon name="ios-settings" size={pxToDp(28)} style={readerStyle.barTopLeft} color="#FFF"/>
                            <Text style={readerStyle.barBottomTxt}>设置</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={readerStyle.barBottomInnerView}>
                        <TouchableOpacity style={readerStyle.barBottomInnerView} onPress={() => alert('缓存')}>
                            <Icon name="ios-cloud-download" size={pxToDp(28)} style={readerStyle.barTopLeft}
                                  color="#FFF"/>
                            <Text style={readerStyle.barBottomTxt}>缓存</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={readerStyle.barBottomInnerView}>
                        <TouchableOpacity style={readerStyle.barBottomInnerView}
                                          onPress={this.chapterHandler.bind(this, true)}>
                            <Icon name="ios-menu" size={pxToDp(28)} style={readerStyle.barTopLeft} color="#FFF"/>
                            <Text style={readerStyle.barBottomTxt}>目录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    //目录菜单右侧滑出
    chapterView() {
        return (

            <Animated.View onPress={this.hiddenChapter.bind(this)} style={[readerStyle.chapterViewOuter, {
                transform: [{translateX: this.state.translateX}]
            }]}>
                <ScrollView style={readerStyle.chapterView}>
                    <View style={readerStyle.chapterMenuView}>
                        <Text style={readerStyle.chapterMenuText}>
                            目录
                        </Text>
                    </View>

                    <TouchableOpacity activeOpacity={1} onPress={this.selectChapter.bind(this)}>
                        <View style={readerStyle.chapterItemView}>
                            <Text style={readerStyle.chapterItemText}>
                                01.第一章 前往遗迹
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1}>
                        <View style={readerStyle.chapterItemView}>
                            <Text style={readerStyle.chapterItemText}>
                                01.第一章 前往遗迹
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1}>
                        <View style={readerStyle.chapterItemView}>
                            <Text style={readerStyle.chapterItemText}>
                                01.第一章 前往遗迹
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

            </Animated.View>
        )
    }

    //目录操作
    chapterHandler() {
        // Animated.sequence([
            Animated.timing(this.state.translateX, {
                toValue: 0,
                useNativeDriver: true
            }).start();
            // ,
            // Animated.timing(this.state.translateX, {
            //     toValue: 0.8,
            //     useNativeDriver: true
            // })

        // ]).start();

        // alert(JSON.stringify(this.state.translateX));
        // this.setState({
        //     showChapter:state
        // })
    }

    hiddenChapter() {
        Animated.timing(this.state.translateX, {
            toValue: 2 * deviceWidth,
            useNativeDriver: true
        }).start();
        // Animated.sequence([
        //     Animated.timing(this.state.translateX, {
        //         toValue: 2 * deviceWidth,
        //         useNativeDriver: true
        //     })
        //     // ,
        //     // Animated.timing(this.state.opacity, {
        //     //     toValue: 0,
        //     //     useNativeDriver: true
        //     // })
        // ]).start();
    }

    //选中章节
    selectChapter() {
        this.hiddenChapter();
        this.changeBarState(false);
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
    barView: {
        position: 'absolute',
        width: deviceWidth,
        height: deviceHeight
    },
    barTop: {
        height: 80,
        width: deviceWidth,
        backgroundColor: '#000',
        opacity: .9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    barTopLeft: {},
    barTopRight: {
        flexDirection: 'row',
    },
    barTxt: {
        fontSize: pxToDp(20),
        color: "#FFF",
        marginRight: pxToDp(10)
    },
    barBottomInnerView: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    barBack: {
        paddingLeft: pxToDp(20)
    },
    barBottomTxt: {
        fontSize: pxToDp(20),
        color: "#FFF",
        marginRight: pxToDp(10),
        // flex:1,
        marginLeft: 15,
        textAlign: 'center'
    },
    barCenter: {
        height: deviceHeight - 200,
    },
    barBottom: {
        height: 100,
        width: deviceWidth,
        backgroundColor: '#000',
        opacity: .9,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    chapterViewOuter: {
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: '#000',
        opacity: .8,
        position: 'absolute',
        top: pxToDp(62),
        zIndex: 4
    },
    chapterView: {
        backgroundColor: '#FFF',
        height: deviceHeight - pxToDp(150),
        width: deviceWidth,
        position: 'absolute',
        transform: [{translateX: 100}],
        paddingRight: pxToDp(100),
        paddingLeft: pxToDp(20),
        paddingTop: pxToDp(20),
        paddingBottom: pxToDp(20)
    },
    chapterMenuView: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: '#999',
        flexDirection: 'row',
        alignItems: 'center',
    },
    chapterMenuText: {
        fontSize: pxToDp(18),
        paddingBottom: pxToDp(10),
    },
    chapterItemView: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: '#999'
    },
    chapterItemText: {
        paddingTop: pxToDp(12),
        fontSize: pxToDp(16),
        paddingBottom: pxToDp(12)
    }
});
export default IReader;
/**
 *  小说阅读器
 * User: heliang
 * Date: 2017/7/21.
 */
import React, {Component} from 'react';
import {Text,ScrollView, StyleSheet,FlatList, View, Image,BackHandler,ToastAndroid} from 'react-native';
import {deviceHeight,deviceWidth} from '../util/pxToDp';
import commonStyle from '../commonstyle/common';

class IReader extends Component{
    state={
        characterContents:[{
            id:1,
            characterName:"第一章 桃花源里人家",
            characterContent:[
                "岭南，韶州东北二十余里处，有一座无名山谷，山谷四面环山，就连唯一的出口，那条狭窄的谷道里面，也有一座矮山挡道，要翻过矮山，才会豁然开朗，发现其中别有天地。",
                "大唐咸亨三年，忽然有十一姓共计百余人，在当地官府的安排下来到这个隐蔽的山谷，铲草平院，伐木作屋，数日间便建成了一个小村庄，取名为桃源村。",
                "因山村地势隐蔽，故而桃源村与其它山民少有接触，但是因为常有樵夫和猎户从这里经过，渐渐的，对这个四面环山的小村便也略微有了一些了解。",
                "初时，山民皆以为奇，时有议论，不过天长时久，也就见怪不怪了。",
                "十一年后，大唐永淳二年的某一天。"
            ]
        },
            {
                id:1,
                characterName:"第一章 桃花源里人家",
                characterContent:[
                    "岭南，韶州东北二十余里处，有一座无名山谷，山谷四面环山，就连唯一的出口，那条狭窄的谷道里面，也有一座矮山挡道，要翻过矮山，才会豁然开朗，发现其中别有天地。",
                    "大唐咸亨三年，忽然有十一姓共计百余人，在当地官府的安排下来到这个隐蔽的山谷，铲草平院，伐木作屋，数日间便建成了一个小村庄，取名为桃源村。",
                    "因山村地势隐蔽，故而桃源村与其它山民少有接触，但是因为常有樵夫和猎户从这里经过，渐渐的，对这个四面环山的小村便也略微有了一些了解。",
                    "初时，山民皆以为奇，时有议论，不过天长时久，也就见怪不怪了。",
                    "十一年后，大唐永淳二年的某一天。"
                ]
            }]
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
                <Text key={index} style={commonStyle.readerContent}>
                    {content}
                </Text>
            )
        })
        return ary;
    }
    renderItem=({item})=>{
        let {id,characterName,characterContent}=item;
        // alert(JSON.stringify(item));
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
            <ScrollView horizontal={true}>
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
                    // contentContainerStyle={readerStyle.readerBg}
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
        // textAlign:'center',
        flex: 1,
        justifyContent: 'space-between'
    },
    readerContentInner:{
        alignSelf: 'center',
        flex: 1
    }
});


export default  IReader;
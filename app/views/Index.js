/**
 * 首页
 * User: heliang
 * Date: 2017/8/3.
 */
import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';

class Index extends Component {

    static  navigationOptions = ({navigation, screenProps}) => ({
        title: navigation.state.params == null ? "1" : navigation.state.params.title,
        headerLeft: (
            <Text style={{paddingLeft:4}} onPress={navigation.state.params == null ? () => {
            } : navigation.state.params.navigatePress.bind(this)}>
                返回
            </Text>
        ),
        headerRight: (
            <Text style={{paddingRight:4}} onPress={navigation.state.params == null ? () => {
            } : navigation.state.params.navigateNextPress.bind(this)}>
                下一步
            </Text>
        ),
        headerBackTitle:"返回",
        tabBarLabel: "首页",
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../assets/images/item-select.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )
    })

    componentWillMount() {
        this.props.navigation.setParams({
            title: '首页',
            navigatePress: this.navigatePress.bind(this),
            navigateNextPress:this.navigateNext.bind(this)
        })
    }

    navigatePress() {
        let {navigation}=this.props;
        let {setParams,navigate}=navigation;
        // setParams({
        //     title:"切换"
        // })
        navigate('Test',{
            title:'哈哈'
        });
    }

    navigateNext(){
        let {navigation}=this.props;
        let {navigate}=navigation;
        navigate('List',{
            title:'列表'
        });
    }


    render() {
        return (
            <View>
                <Text>首页</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});
export default Index;
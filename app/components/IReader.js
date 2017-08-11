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

                            var ary=this._formatChapter("在晋国都城新绛数里之外，耸立着一座夯土墙环绕的坚固小城，此城名为赵氏之宫，乃是晋国六大卿族之一，赵氏的私邑。 这儿却还有一个流传更广的名字：下宫！七十多年前那场“下宫之难”，杀得人头滚滚、血灌井田，赵氏满门被灭，只幸存一个赵氏孤儿。随后赵氏孤儿绝境复起，这座被摧毁的城邑也恢复了些许元气，幸存的隶臣们都感慨这是先祖的恩德泽被。 不过在邑中一处宽阔的马厩中，却有个赵氏少年对这所谓的“德泽”嗤之以鼻，他用没人听得到的声音嘀咕道： “京剧和电影里尽是胡编乱造，我来到了这时代，才知道，世上压根没有屠岸贾这个人啊！” “好奇害死猫啊，我就不该乱问自毁三观的，谁曾想到，剧本里的贞洁烈女赵庄姬，也就是我这具身体的太祖母。她居然，居然是个丈夫死后，就穿着丧服勾引叔叔上床的****。在奸情被撞破后，又作死向国君进谗言灭了家族满门，真是红颜祸水啊！” 少年不住地摇头叹息，他尚未及冠，锥形发髻上只裹了条青色帻巾，上衣左衿紧紧压着右衿，在右腋下结缨，形成了华夏人崇尚的右衽模样。可他的下身，却随意地套着一条袴褶，这是从狄地传入的外来货，形似后世的裤子。这一结合，颇有些不伦不类，要是被赵氏之宫里那些死板的家师、家傅瞧见了，定然又是一顿口诛笔伐。 他在充斥着牲畜气息的厩苑里，显得卓尔不群：虽容貌平平，但那双剑眉衬得一双眼睛格外精神；且眼窝微陷，鼻梁略高，似乎有部分戎狄血统；他手脚干净不像是干过重活的，脸色红润，牙齿整齐，显然是位衣食无忧的肉食者。却不知，为何跑到了这下贱肮脏的厩苑里？ 而且，他也不干活，就这么叼着根牧草，悠闲地坐在木质马槽上，管理厩苑的赵氏小吏对此却只敢睁一只眼闭一只眼。 也有刚来的厩吏想上前去用鞭子说教一二，却被前辈们揪过来就扇了一巴掌，“贼！你可知道那是谁？” “谁？” “是无恤小君子！” 那个刚从外邑调来的厩吏捂着脸恍然大悟，原来是他！ 这事情还在赵氏之宫引发了一场轰动：这位小君子也不知道是哪根筋不对，在燕飨时居然当众箕坐，向他父亲赵鞅行礼时居然不下拜顿首，而是用了地位平等者的空手礼！ 这还了得，于是他被怒不可恕的宗主和主母痛斥一顿，罚到厩苑来思过，至今已经一旬了。 虽然此子是主上四子一女中最不受待见的贱庶子，可君子就是君子，行冠后至少能做一下大夫，领百户之邑，的确不是他这等皂隶小人得罪得起的！ 说实话，当事人赵无恤实在是无辜得很，因为他一个来自两千年之后的人，哪里懂什么春秋古礼啊！ 他本姓赵，用家里爷爷的话说，他们家郡望天水赵氏，这祖上也是阔过的！能一直追溯到战国时的赵国王室，以及春秋时的晋卿赵氏。 爷爷还经常翻着家里的线装书，指着那长长族谱的最顶端给他看： “这是简子赵鞅，这是襄子赵无恤，我们赵家的老祖宗，建立了赵国的人。”这两位的事迹，在爷爷年复一年的唠叨下，他倒背如流。 但做梦也没想到，他居然在一场车祸后，追朔着先祖的血脉，一下子就穿越回了春秋时代。 最初，只觉得世界昏昏沉沉，眼前似乎还有一个古装少年正向他鞠手行礼。 “我乃嬴姓赵氏子孙，名为无恤。” “我一生戎马，熬过了晋阳之围，带领赵魏韩灭知伯，三家分晋。然而赵国也在我手中元气大伤，之后整整被魏、韩压制了一百年。” “我还有一件抱憾终身的事……” 梦到此戛然而止，脑袋里多出了一些零碎记忆，从开始蹒跚学步的孩童，一步步成长为弱冠少年，在苏醒后短暂的惊恐后，他明白过来了。 从前的名字不再重要，从现在开始，他就是赵无恤！他的家族，便是赵氏！ 不过谁曾想，一向被人津津乐道的赵氏孤儿案，居然是这种黑历史……偶然知道真相的他从此不敢再问一句。 谁没事去关心老祖母混乱的下半身生活啊！ 有这样的大污点，赵氏还怎么有脸出来混，要是他，以后建立了赵国，也得逼着史官把这龌龊事彻底抹掉，改成一出能让群众流泪，对着虚拟奸臣屠岸贾咬牙切齿的悲剧史诗。 然而，穿越者还来不及踌躇满志，就惹上了祸事。也算他倒霉，或是继承的记忆破碎凌乱，或是这赵无恤本就没接受过正常的贵族训练。穿越最初几天，他便在说话和礼仪上屡屡出错，被那位看他不顺眼的少君，也就是正室夫人撵到厩苑思过。 不幸中的万幸，从残留不多的记忆里，赵无恤学会了上古汉语。先秦的华夏音韵，小舌颤音非常多，在现代人听来跟藏语差不多，极其古怪。但或许是身体习惯的优势，他并没有遇到可怕的语言障碍，在多练习几次后，感觉还算顺口。 仅仅过了一旬，也就是十天后，他的嘴巴便溜得能够坐在这里，跟圉童、牧人们说书了。 赵氏祖先以牧马驾车闻名于虞夏殷周之际，后世子孙虽然成了养尊处优的卿大夫，却也没全然忘记祖宗的老本行。这厩苑里不乏燕、代骏马，以及从秦国请来的相马能手。 照料牲畜的圉、牧，也就是放马童和牧牛人，更是不计其数，他们大多头发乱蓬枯萎，衣短褐。现在，在朝食前的难得闲暇之余，却一股脑地围在了赵无恤周围，瞪大了眼睛等待着什么。 赵无恤见人差不多聚起来了，便轻咳一声，对着众圉童、牧人说道：“今天，我就给你们说说那东海石猴跟随唐三藏……不对，是辅佐大周穆天子西行的故事！” 这开场白惹得圉童、牧人不安而期待地扭动肩膀。 无恤捏着马鞭侃侃而谈：“在齐国东海外，还有一国土，名曰傲来国，山中有一名山，唤为花果山……” “小君子，齐国在哪啊？”有个瘦高个圉童愣头愣脑地问。 赵无恤用手里的鞭梢敲了下他的脑袋：“就你问题最多，这齐国，就在我晋国的东边，朝着太阳升起的方向，走上一千里，就到了。” 圉童、牧人们纷纷倒吸了一口冷气，对他们来说，一生的活动范围也就是百里，甚至十里之内。 千里？不可想象，不可想象。 这位能知道千里之外故事的庶君子，在他们眼中便几乎等于泰一神的使者，无所不知，无所不晓。 赵无恤的目的，其实只是用来打发无聊的生活，先秦的娱乐项目少得可怜，而作为不受待见的家族庶子，红袖添香？欺男霸女？飞鹰走犬？这些事情就不用想了，在用故事逗姐姐开心前，就先拿这些圉童、牧人们练练嘴。 嗯，以后或者可以找人把赵氏孤儿的传奇故事也记录下来，好混淆视听。 公元前五世纪的华夏，还保持着比较原始的神话体系。 人们知道东皇泰一，知道西王母，知道女娲伏羲，但春秋可没有佛教，更没什么和尚。无恤不知道释迦摩尼的具体生卒年，不过至少可以肯定，佛教还没开始东传。 于是唐僧的角色，就被赵无恤恶趣味地换成了曾经西行前往昆仑山，与西王母相会的西周天子穆王。赵氏老祖宗赵造父的角色，他也想好了，就是赶着白龙马车，忠心耿耿任劳任怨的沙悟净替身。 不知不觉，故事也讲到了第一回的结尾，“却看石猴瞑目蹲身，将身一纵，径跳入瀑布泉中……” 至此，他却戛然而止，从马槽上站起身来，伸了伸腰，而眼前的一众牧童还蹲在地上，眼睛睁得大大的，还在等下文。 在他们十几二十年的生命里，从来没听过这么有趣的故事，乡射礼时三老吟唱的那些拗口诗篇，他们听得云里雾里；宗族祭祀时，巫祝为祖先阅读的颂词，更是一字都听不懂。 眼见赵无恤停住不说，圉童、牧人们心里像是被狗尾巴草挠过似的发痒，但是，有人却比他们还要着急。 “然后呢？瀑布里有什么？石猴当上猴君了么？” 却是赵无恤身后先传来如银铃般的少女声音。 赵无恤回头一看，却见身后有一位绝美的姑娘，正津津有味地听着他的故事。 正所谓巧笑倩兮，美目盼兮。她发如青云，双眸清澈明亮，唇如樱桃，身着缀满红色小花的曲裾深衣，一双能让后世足控们喷血的玉足踏着木屐，从裙摆下只露出了薄如蝉翼的洁白足衣。 正是他的姐姐季嬴。 宗主赵鞅共有四子一女，其中最疏远的是被称为“贱庶子”的幼子无恤，而最宠爱的则是四女季嬴。 有趣的是，小季嬴在几个兄弟里，却偏生跟无恤最亲近。在赵无恤的记忆里，这或许是因为两人在一场大疫中，同时失去了各自母亲的缘故，随后便将同样孤苦伶仃的对方视为同类，惺惺相惜。 虽然重生后已经见过季嬴多次，但赵无恤仍然不由得从内心发出赞叹：这姑娘只比他大几个月，现在才十三岁，尚未到及笄之年便生得如此绝美，长大之后，定然是个倾城倾国的美人。 同时他心里也不免遗憾。 “唉，可惜是姐弟。")
                            ary.forEach((chunk,index)=>{
                                list.push({
                                    key:counter+"_"+index,
                                    characterName:title,
                                    characterContent:[chunk]
                                });

                            })

                            // list.push({
                            //     key:counter,
                            //     characterName:title,
                            //     characterContent:[body]
                            // });


                            if(counter==chapters.length){
                                // list.sort((a,b)=>{
                                //     return a.key-b.key;
                                // })
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

    _formatChapter(content, num, title) {
        let _arr =[]
        let _content = '\u3000\u3000' + content.replace(/\n/g, '@\u3000\u3000')
        let _arrTemp = this.contentFormat(_content)
        _arrTemp.forEach(function(element) {
            // let _chapterInfo = {
            //     title: title,
            //     num: num,
            //     content: element
            // }
            _arr.push(element)
        });

        // alert(_arr);
        return _arr
    }

    contentFormat = (content) => {
        let fontCount = parseInt(deviceWidth / 18 - 1)
        let fontLines = parseInt((deviceHeight - 100) / 34)
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
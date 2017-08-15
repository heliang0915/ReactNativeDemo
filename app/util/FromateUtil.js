/**
 * 格式化 小说信息
 * User: heliang
 * Date: 2017/8/14.
 */

import {deviceWidth,deviceHeight} from '../util/pxToDp';

const _formatChapter=(content, num, title)=>{
    let _arr =[]
    let _content = '\u3000\u3000' + content.replace(/\n/g, '@\u3000\u3000')
    let _arrTemp = _contentFormat(_content)
    _arrTemp.forEach(function(element) {
        _arr.push(element)
    });
    return _arr
}

const _contentFormat = (content) => {
    let fontCount = parseInt(deviceWidth / 18 - 2)
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
export {_formatChapter,_contentFormat}
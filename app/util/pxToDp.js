import {Dimensions} from 'react-native';

const deviceWidthDp = Dimensions.get('window').width;
// UI 默认给图是 750
const uiWidthPx = 750;

console.log('deviceWidthDp>>>'+deviceWidthDp);
function pxToDp(uiElementPx) {
    return uiElementPx *  deviceWidthDp / uiWidthPx;
}
export default pxToDp;
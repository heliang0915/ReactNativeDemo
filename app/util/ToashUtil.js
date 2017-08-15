/**
 * 消息工具
 * User: heliang
 * Date: 2017/8/15.
 */
import Toast from 'react-native-root-toast';
import {ToastAndroid} from 'react-native';

let toast;
/**
 * 冒一个时间比较短的Toast
 * @param content
 */
export const toastShort = (content) => {

    ToastAndroid.show(content,ToastAndroid.SHORT)
    // if (toast !== undefined) {
    //     Toast.hide(toast);
    // }
    // toast = Toast.show(content.toString(), {
    //     duration: Toast.durations.SHORT,
    //     position: Toast.positions.CENTER,
    //     shadow: true,
    //     animation: true,
    //     hideOnPress: true,
    //     delay: 0,
    //     onShow: () => {
    //         alert('show');
    //     }
    // });
};

/**
 * 冒一个时间比较久的Toast
 * @param content
 */
export const toastLong = (content) => {
    // if (toast !== undefined) {
    //     Toast.hide(toast);
    // }
    // toast = Toast.show(content.toString(), {
    //     duration: Toast.durations.LONG,
    //     position: Toast.positions.CENTER,
    //     shadow: true,
    //     animation: true,
    //     hideOnPress: true,
    //     delay: 0
    // });
    ToastAndroid.show(content,ToastAndroid.LONG)
};
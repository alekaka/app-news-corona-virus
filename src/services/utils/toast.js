//import NativeModules from 'ToastAndroid';

const RCTToastAndroid = require('NativeModules').ToastAndroid;

export const Toast = {
    SHORT: RCTToastAndroid.SHORT,
    LONG: RCTToastAndroid.LONG,

    TOP: RCTToastAndroid.TOP,
    BOTTOM: RCTToastAndroid.BOTTOM,
    CENTER: RCTToastAndroid.CENTER,
  
    show: function (
      message: string,
      duration: number
    ): void {
      RCTToastAndroid.show(message, duration);
    },
  
    showWithGravity: function (
      message: string,
      duration: number,
      gravity: number,
    ): void {
      RCTToastAndroid.showWithGravity(message, duration, gravity);
    },
  };


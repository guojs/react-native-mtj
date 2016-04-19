package com.horcrux.RNMtj;

import android.app.Activity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import com.baidu.mobstat.SendStrategyEnum;
import com.baidu.mobstat.StatService;

public class RNMtj extends ReactContextBaseJavaModule {

    ReactApplicationContext reactContext;
    private Activity activity;

    public RNMtj(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        this.reactContext = reactContext;
        this.activity = activity;
    }

    @Override
    public String getName() {
        return "Mtj";
    }

    @ReactMethod
    public void start(String appId, ReadableMap options) {

        // 设置AppKey
        StatService.setAppKey(appId);

        // 设置渠道
        if (options.hasKey("channelId")) {
            StatService.setAppChannel(activity, options.getString("channelId"), true);
        }

        // 设置session过期时间
        StatService.setSessionTimeOut(options.getInt("sessionResumeInterval"));

        // 设置崩溃错误收集
        if (options.getBoolean("enableExceptionLog")) {
            StatService.setOn(activity, StatService.EXCEPTION_LOG);
        }

        //  设置启动时日志发送延时的秒数
        if (options.hasKey("setLogSenderDelayed")) {
            StatService.setLogSenderDelayed(options.getInt("setLogSenderDelayed"));
        }

        SendStrategyEnum strategy = SendStrategyEnum.APP_START;

        if (options.hasKey("logStrategy")) {
            int interval = 1;
            switch (options.getInt("logStrategy")) {
                case 0:
                    strategy = SendStrategyEnum.APP_START;
                    break;
                case 1:
                    strategy = SendStrategyEnum.ONCE_A_DAY;
                    break;
                case 2:
                    strategy = SendStrategyEnum.SET_TIME_INTERVAL;
                    break;
            }
            /*
            * 设置日志发送策略
            */
            if (options.hasKey("logSendInterval")) {
                interval = options.getInt("logSendInterval");
            }

            StatService.setSendLogStrategy(activity, strategy, interval, options.getBoolean("logSendWifiOnly"));
        }

        // 调试百度统计SDK的Log开关
        StatService.setDebugOn(options.getBoolean("enableDebugOn"));
    }

    @ReactMethod
    public void logEvent(String evenId, String evenLabel) {
        StatService.onEvent(activity, evenId, evenLabel);
    }

    @ReactMethod
    public void eventStart(String evenId, String evenLabel) {
        StatService.onEventStart(activity, evenId, evenLabel);
    }

    @ReactMethod
    public void eventEnd(String evenId, String evenLabel) {
        StatService.onEventEnd(activity, evenId, evenLabel);
    }

    @ReactMethod
    public void logEventWithDurationTime(String evenId, String evenLabel, int duration) {
        StatService.onEventDuration(activity, evenId, evenLabel, duration);
    }

    @ReactMethod
    public void pageviewStartWithName(String name) {
        StatService.onPageStart(activity, name);
    }

    @ReactMethod
    public void pageviewEndWithName(String name) {
        StatService.onPageEnd(activity, name);
    }
}

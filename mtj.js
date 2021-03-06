import _ from 'lodash';

import MtjClass from './MtjClass';

const LogStrategies = {
    appLaunch: 0, // BaiduMobStatLogStrategyAppLaunch 启动时发送默认值，推荐使用
    appDay: 1, // BaiduMobStatLogStrategyAppDay 每日发送
    custom: 2 // BaiduMobStatLogStrategyCustom 自定义发送间隔
};
const MonitorStartegies = {
    none: 0, // BaiduMobStatMonitorStrategy 不启动自动监控 (默认)
    pageView: 1, // BaiduMobStatMonitorStrategyPageView 只启动页面统计自动监控
    button: 2, // BaiduMobStatMonitorStrategyButton 只启动button统计自动监控
    all: 3 // BaiduMobStatMonitorStrategyAll 启动页面统计与button统计自动监控
};

type Options = {
    shortAppVersion?: string;
    channelId?: string;
    enableExceptionLog?: bool;
    logSendWifiOnly?: bool;
    sessionResumeInterval?: number; // 有效值范围0-600s
    enableDebugOn?: bool;
    adid?: string; // ios only
    monitorStartegy?: $Keys<typeof MonitorStartegies>; // ios only
    logStrategy?: $Keys<typeof LogStrategies>;
    logSendInterval?: number; // 单位：小时
    setLogSenderDelayed?: number; // 大小为0s到30s之间 单位: 秒  android only
};

let defaultTracker;

function callMethodOnDefaultTracker(methodName:string, ...args) {
    if (defaultTracker) {
        defaultTracker[methodName](...args);
    } else {
        console.warn(`在调用 \`${methodName}\` 方法前，需要试用 \`start\` 方法进行初始化`);
    }
}

function start(appId: string, options:Options = {}):MtjClass {
    if (!defaultTracker) {
        defaultTracker = new MtjClass(appId, options);
    }
}

function getDefaultTracker() {
    return defaultTracker;
}

function logEvent(eventId: string, eventLabel: string) {
    callMethodOnDefaultTracker('logEvent', eventId, eventLabel);
}

function eventStart(eventId: string, eventLabel: string) {
    callMethodOnDefaultTracker('eventStart', eventId, eventLabel);
}

function eventEnd(eventId: string, eventLabel: string) {
    callMethodOnDefaultTracker('eventEnd', eventId, eventLabel);
}

function logEventWithDurationTime(eventId: string, eventLabel: string, durationTime: number) {
    callMethodOnDefaultTracker('logEventWithDurationTime', eventId, eventLabel, ~~durationTime);
}

function pageviewStartWithName(name: string) {
    callMethodOnDefaultTracker('pageviewStartWithName', name);
}

function pageviewEndWithName(name: string) {
    callMethodOnDefaultTracker('pageviewEndWithName', name);
}

let currentPageView;

function pageViewChangeWithName(name: string) {
    if (currentPageView) {
        callMethodOnDefaultTracker('pageviewEndWithName', currentPageView);
    }
    callMethodOnDefaultTracker('pageviewStartWithName', name);
    let previewPageView = currentPageView;
    currentPageView = name;

    return previewPageView;
}

export {
    start,
    logEvent,
    eventStart,
    eventEnd,
    logEventWithDurationTime,
    pageviewStartWithName,
    pageviewEndWithName,
    pageViewChangeWithName
};

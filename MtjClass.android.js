import {NativeModules} from 'react-native';
let {Mtj} = NativeModules;
let trackers = {};

class MtjClass{
    id = null;

    constructor(appId: string, options:Options = {}) {
        if (!appId) {
            console.warn('调用start方法出错，缺少appId参数');
        } else if(!trackers[appId]){
            trackers[appId] = true;
            let setLogSenderDelayed = (~~options.setLogSenderDelayed) || 0;
            if (setLogSenderDelayed < 0) {
                setLogSenderDelayed = 0;
            } else if (setLogSenderDelayed > 30) {
                setLogSenderDelayed = 30;
            }

            Mtj.start(appId, _.defaults(options, {
                enableExceptionLog: true,
                logSendWifiOnly: false,
                sessionResumeInterval: 30,
                enableDebugOn: false,
                adid: ''
            }));
        }
        this.id = appId;
    };

    logEvent = (eventId: string, eventLabel: string) => {
        Mtj.logEvent(eventId, eventLabel);
    };

    eventStart = (eventId: string, eventLabel: string) => {
        Mtj.eventStart(eventId, eventLabel);
    };

    eventEnd = (eventId: string, eventLabel: string) => {
        Mtj.eventEnd(eventId, eventLabel);
    };

    logEventWithDurationTime = (eventId: string, eventLabel: string, durationTime: number) => {
        Mtj.logEventWithDurationTime(eventId, eventLabel, durationTime);
    };

    pageviewStartWithName = (name: string) => {
        Mtj.pageviewStartWithName(name);
    };

    pageviewEndWithName = (name: string) => {
        Mtj.pageviewEndWithName(name);
    };
}

export default MtjClass;

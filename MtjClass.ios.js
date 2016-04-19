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
        Mtj.logEvent(this.id, eventId, eventLabel);
    };

    eventStart = (eventId: string, eventLabel: string) => {
        Mtj.eventStart(this.id, eventId, eventLabel);
    };

    eventEnd = (eventId: string, eventLabel: string) => {
        Mtj.eventEnd(this.id, eventId, eventLabel);
    };

    logEventWithDurationTime = (eventId: string, eventLabel: string, durationTime: number) => {
        Mtj.logEventWithDurationTime(this.id, eventId, eventLabel, durationTime);
    };

    pageviewStartWithName = (name: string) => {
        Mtj.pageviewStartWithName(this.id, name);
    };

    pageviewEndWithName = (name: string) => {
        Mtj.pageviewEndWithName(this.id, name);
    };
}

export default MtjClass;

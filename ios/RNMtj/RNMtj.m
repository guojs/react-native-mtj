#import "RNMtj.h"
#import "BaiduMobStat.h"

static NSMutableDictionary* trackers;

@implementation RNMtj

RCT_EXPORT_MODULE(Mtj)

RCT_REMAP_METHOD(start,
                 appId:(NSString *)appId
                 options:(NSDictionary *) options) {
    if (!trackers) {
        trackers = [[NSMutableDictionary alloc] init];
    }
    
    
    BaiduMobStat* statTracker = [BaiduMobStat defaultStat];

    // shortAppVersion
    NSString* shortAppVersion = [options objectForKey:@"shortAppVersion"];
    statTracker.shortAppVersion = shortAppVersion ? shortAppVersion : [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];

    // channelId
    NSString* channelId = [options objectForKey:@"channelId"];
    if (channelId) {
        statTracker.channelId = channelId;
    }
    
    // enableExceptionLog
    NSNumber* enableExceptionLog = [options objectForKey:@"enableExceptionLog"];
    statTracker.enableExceptionLog = [enableExceptionLog isEqualToNumber:[NSNumber numberWithInt:1]];
    
    // logSendWifiOnly
    NSNumber* logSendWifiOnly = [options objectForKey:@"logSendWifiOnly"];
    statTracker.logSendWifiOnly = [logSendWifiOnly isEqualToNumber:[NSNumber numberWithInt:1]];
    
    // sessionResumeInterval
    NSNumber* sessionResumeInterval = [options objectForKey:@"sessionResumeInterval"];
    if (sessionResumeInterval) {
         statTracker.sessionResumeInterval = [sessionResumeInterval integerValue];
    }
    
    // enableDebugOn
    NSNumber* enableDebugOn = [options objectForKey:@"enableDebugOn"];
    if (enableDebugOn) {
        statTracker.enableDebugOn = [enableDebugOn isEqualToNumber:[NSNumber numberWithInt:1]];
    }
    
    // adid
    NSString* adid = [options objectForKey:@"adid"];
    if (adid) {
        statTracker.adid = adid;
    }
    
    // monitorStartegy
    BaiduMobStatMonitorStrategy monitorStrategy;
    switch ([[options objectForKey:@"monitorStartegy"] integerValue]) {
        case 0:
            monitorStrategy = BaiduMobStatMonitorStrategyNone;
            break;
        case 1:
            monitorStrategy = BaiduMobStatMonitorStrategyPageView;
            break;
        case 2:
            monitorStrategy = BaiduMobStatMonitorStrategyButton;
            break;
        case 3:
            monitorStrategy = BaiduMobStatMonitorStrategyAll;
            break;
        default:
            monitorStrategy = BaiduMobStatMonitorStrategyNone;
            break;
    }
    statTracker.monitorStrategy = monitorStrategy;
    
    BaiduMobStatLogStrategy logStrategy;
    switch ([[options objectForKey:@"logStrategy"] integerValue]) {
        case 0:
            logStrategy = BaiduMobStatLogStrategyAppLaunch;
            break;
        case 1:
            logStrategy = BaiduMobStatLogStrategyDay;
            break;
        case 2:
            logStrategy = BaiduMobStatLogStrategyCustom;
            statTracker.logSendInterval = [[options objectForKey:@"logSendInterval"] integerValue];
            break;
        default:
            logStrategy = BaiduMobStatLogStrategyAppLaunch;
            break;
    }
    statTracker.logStrategy = logStrategy;
    
    [statTracker startWithAppId:appId];
    [trackers setObject:statTracker forKey:appId];
}


RCT_REMAP_METHOD(logEvent,
                 appId:(NSString *)appId
                 eventId:(NSString *)eventId
                 eventLabel:(NSString *)eventLabel
                 ){
    [[trackers objectForKey:appId] logEvent:eventId eventLabel:eventLabel];
}

RCT_REMAP_METHOD(eventStart,
                 appId:(NSString *)appId
                 evenStarttId:(NSString *)eventId
                 eventStartLabel:(NSString *)eventLabel
                 ){
    [[trackers objectForKey:appId] eventStart:eventId eventLabel:eventLabel];
}


RCT_REMAP_METHOD(eventEnd,
                 appId:(NSString *)appId
                 eventEndId:(NSString *)eventId
                 eventEndLabel:(NSString *)eventLabel
                 ){
    [[trackers objectForKey:appId] eventEnd:eventId eventLabel:eventLabel];
}

RCT_REMAP_METHOD(pageviewStartWithName,
                 appId:(NSString *)appId
                 startName:(NSString *)name
                 ){
    [[trackers objectForKey:appId] pageviewStartWithName:name];
}

RCT_REMAP_METHOD(pageviewEndWithName,
                 appId:(NSString *)appId
                 endName:(NSString *)name
                 ){
    [[trackers objectForKey:appId] pageviewEndWithName:name];
}

@end
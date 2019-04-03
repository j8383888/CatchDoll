/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {

    getUserInfo(): Promise<any>;

    login(): Promise<any>

}

class DebugPlatform implements Platform {
    async getUserInfo() {
        return { nickName: "username" }
    }
    async login() {

    }
}

class WXPlatform implements Platform {
    async getUserInfo() {
        return new Promise((resolve, reject) => {
            wx["getUserInfo"]({
                withCredentials: true,
                success: res => {
                    var userInfo = res.userInfo;
                    var nickName = userInfo.nickName;
                    var avatarUrl = userInfo.avatarUrl;
                    var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                    var province = userInfo.province;
                    var city = userInfo.city;
                    var country = userInfo.country;
                    resolve(userInfo);
                },
                fail: res => {
                    wx["showModal"]({
                        title: '友情提醒',
                        content: '请允许微信获得授权!',
                        confirmText: "授权",
                        showCancel: false,
                        success: res => {
                            resolve(null);
                        }
                    });
                }
            });
        })
    }
    async login() {
    }
}

declare interface Window {
    platform: Platform
}


declare let platform: Platform;
if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
    if (!window.platform) {
        platform = new WXPlatform();
    }
}
else {
    if (!window.platform) {
        platform = new DebugPlatform();
    }
}





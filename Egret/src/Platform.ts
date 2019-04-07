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
        console.error("window getUserInfo")
    }
    async login() {
        console.error("window login")
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
        console.error("获取微信OpenID");
        return new Promise((resolve, reject) => {
            wx["login"]({
                //获取code
                success: function (res) {
                    var code = res.code; //返回code
                    var appId = 'wx2f26847a6393a178';
                    var secret = '4af1b2014ffa5e37b5f5172c1195eb9e';
                    wx["request"]({
                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
                        data: {},
                        header: {
                            'content-type': 'json'
                        },
                        success: function (res) {
                            var openid = res.data.openid //返回openid
                            console.error('openid为:' + openid);
                            resolve(openid);
                        }
                    })
                }
            })
        })

    }

    public getWXOpenId() {
        return new Promise((resolve, reject) => {
            wx["login"]({
                //获取code
                success: function (res) {
                    var code = res.code; //返回code
                    resolve(code);
                },
                fail: res => {
                    console.error("逻辑有误")
                }
            })
        })
    }
}







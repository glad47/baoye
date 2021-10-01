/**
 * 桌面通知
 * @param title
 * @param options
 */
const notifyMe = (title: string, options: NotificationOptions, callFn?: any | void) => {
    let {icon, dir} = options;
    if (!icon) {
        options.icon = 'https://www.pcbonline.com/_nuxt/img/logo_a.png'
    }
    if (!dir) dir = 'auto'
    // 先检查浏览器是否支持
    if (!window.Notification) {
        console.error('浏览器不支持通知');
    } else {
        // 检查用户曾经是否同意接受通知
        if (Notification.permission === 'granted') {
            const notification = new Notification(title, options); // 显示通知
            notification.onclick = callFn || {}
        } else if (Notification.permission === 'default') {
            // 用户还未选择，可以询问用户是否同意发送通知
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    const notification = new Notification(title, options); // 显示通知
                    notification.onclick = callFn || {}
                } else if (permission === 'default') {
                    console.warn('用户关闭授权 未刷新页面之前 可以再次请求授权');
                    switch (getBrowerInfo().client.name) {
                        case "QQ浏览器":
                            console.warn("QQ浏览器请在“设置-高级-内容设置-通知-选择允许通知或者点击管理例外情况按钮，添加www.jnd.kim");
                            break;
                        case "edge浏览器":
                            console.warn("edge浏览器请在“设置-高级-cookie和网站权限-所有权限-通知-选择允许通知或者点击管理例外情况按钮，添加www.jnd.kim");
                            break;
                        case "edg浏览器":
                            console.warn("edg浏览器请在“设置-高级-cookie和网站权限-所有权限-通知-选择允许通知或者点击管理例外情况按钮，添加www.jnd.kim");
                            break;
                        case "Chrome":
                            console.warn("Chrome浏览器请在“设置-隐私设置和安全性-通知-选择允许通知或者在允许列表点击添加，添加www.jnd.kim");
                            break;
                        default:
                            console.warn("请自行百度如何允许浏览器发送通知")
                            break;
                    }
                } else {
                    // denied
                    switch (getBrowerInfo().client.name) {
                        case "QQ浏览器":
                            console.warn("QQ浏览器请在“设置-高级-内容设置-通知-选择允许通知或者点击管理例外情况按钮，添加www.jnd.kim");
                            break;
                        case "edge浏览器":
                            console.warn("edge浏览器请在“设置-高级-cookie和网站权限-所有权限-通知-选择允许通知或者点击管理例外情况按钮，添加www.jnd.kim");
                            break;
                        case "edg浏览器":
                            console.warn("edg浏览器请在“设置-高级-cookie和网站权限-所有权限-通知-选择允许通知或者点击管理例外情况按钮，添加www.jnd.kim");
                            break;
                        case "Chrome":
                            console.warn("Chrome浏览器请在“设置-隐私设置和安全性-通知-选择允许通知或者在允许列表点击添加，添加www.jnd.kim");
                            break;
                        default:
                            console.warn("请自行百度如何允许浏览器发送通知")
                            break;
                    }
                }
            });
        } else {
            // denied 用户拒绝
            switch (getBrowerInfo().client.name) {
                case "QQ浏览器":
                    console.warn("QQ浏览器请在“设置-高级-内容设置-通知-选择允许通知或者点击管理例外情况按钮，添加www.jnd.kim");
                    break;
                case "edge浏览器":
                    console.warn("edge浏览器请在“设置-高级-cookie和网站权限-所有权限-通知-选择允许通知或者点击管理例外情况按钮，添加www.jnd.kim");
                    break;
                case "edg浏览器":
                    console.warn("edg浏览器请在“设置-高级-cookie和网站权限-所有权限-通知-选择允许通知或者点击管理例外情况按钮，添加www.jnd.kim");
                    break;
                case "Chrome":
                    console.warn("Chrome浏览器请在“设置-隐私设置和安全性-通知-选择允许通知或者在允许列表点击添加，添加www.jnd.kim");
                    break;
                default:
                    console.warn("请自行百度如何允许浏览器发送通知")
                    break;
            }
        }
    }
}

//获取当前浏览器是啥，如果有匹配问题，自行修改
function getBrowerInfo(){
    const Browser: any = (function(window: any) {
        const document = window.document,
            navigator = window.navigator,
            agent = navigator.userAgent.toLowerCase(),
            //IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
            //IE10:10(兼容模式7||8||9)
            IEMode = document.documentMode,
            //chorme
            chrome = window.chrome || false,
            System : any = {
                agent: agent,
                //是否为IE
                isIE: /trident/.test(agent),
                //Gecko内核
                isGecko: agent.indexOf("gecko") > 0 && agent.indexOf("like gecko") < 0,
                //webkit内核
                isWebkit: agent.indexOf("webkit") > 0,
                //是否为标准模式
                isStrict: document.compatMode === "CSS1Compat",
                //是否支持subtitle
                supportSubTitle: function() {
                    return "track" in document.createElement("track");
                },
                //是否支持scoped
                supportScope: function() {
                    return "scoped" in document.createElement("style");
                },

                //获取IE的版本号
                ieVersion: function() {
                    const rMsie  = /(msie\s|trident.*rv:)([\w.]+)/;
                    const ma = window.navigator.userAgent.toLowerCase()
                    const match: any = rMsie.exec(ma);
                    try {
                        return match[2];
                    } catch (e) {
                        return IEMode;
                    }
                },
                //Opera版本号
                operaVersion: function() {
                    try {
                        if (window.opera) {
                            return agent.match(/opera.([\d.]+)/)[1];
                        } else if (agent.indexOf("opr") > 0) {
                            return agent.match(/opr\/([\d.]+)/)[1];
                        }
                    } catch (e) {
                        return 0;
                    }
                }
            };

        try {
            //浏览器类型(IE、Opera、Chrome、Safari、Firefox)
            System.type = System.isIE ? "IE" :
                window.opera || (agent.indexOf("opr") > 0) ? "Opera" :
                    (agent.indexOf("chrome") > 0) ? "Chrome" :
                        //safari也提供了专门的判定方式
                        window.openDatabase ? "Safari" :
                            (agent.indexOf("firefox") > 0) ? "Firefox" :
                                'unknow';

            //版本号
            System.version = (System.type === "IE") ? System.ieVersion() :
                (System.type === "Firefox") ? agent.match(/firefox\/([\d.]+)/)[1] :
                    (System.type === "Chrome") ? agent.match(/chrome\/([\d.]+)/)[1] :
                        (System.type === "Opera") ? System.operaVersion() :
                            (System.type === "Safari") ? agent.match(/version\/([\d.]+)/)[1] :
                                "0";

            //浏览器外壳
            System.shell = function() {
                if (agent.indexOf("edge") > 0) {
                    System.version = agent.match(/edge\/([\d.]+)/)[1] || System.version;
                    return "edge浏览器";
                }
                if (agent.indexOf("edg") > 0) {
                    System.version = agent.match(/edg\/([\d.]+)/)[1] || System.version;
                    return "edg浏览器";
                }
                //遨游浏览器
                if (agent.indexOf("maxthon") > 0) {
                    System.version = agent.match(/maxthon\/([\d.]+)/)[1] || System.version;
                    return "傲游浏览器";
                }
                //QQ浏览器
                if (agent.indexOf("qqbrowser") > 0) {
                    System.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || System.version;
                    return "QQ浏览器";
                }

                //搜狗浏览器
                if (agent.indexOf("se 2.x") > 0) {
                    return '搜狗浏览器';
                }

                //Chrome:也可以使用window.chrome && window.chrome.webstore判断
                if (chrome && System.type !== "Opera") {
                    const external = window.external,
                        clientInfo = window.clientInformation,
                        //客户端语言:zh-cn,zh.360下面会返回undefined
                        clientLanguage = clientInfo.languages;

                    //猎豹浏览器:或者agent.indexOf("lbbrowser")>0
                    if (external && 'LiebaoGetVersion' in external) {
                        return '猎豹浏览器';
                    }
                    //百度浏览器
                    if (agent.indexOf("bidubrowser") > 0) {
                        System.version = agent.match(/bidubrowser\/([\d.]+)/)[1] ||
                            agent.match(/chrome\/([\d.]+)/)[1];
                        return "百度浏览器";
                    }
                    //360极速浏览器和360安全浏览器
                    if (System.supportSubTitle() && typeof clientLanguage === "undefined") {
                        const storeKeyLen = Object.keys(chrome.webstore).length,
                            v8Locale = "v8Locale" in window;
                        return storeKeyLen > 1 ? '360极速浏览器' : '360安全浏览器';
                    }
                    return "Chrome";
                }
                return System.type;
            };

            //浏览器名称(如果是壳浏览器,则返回壳名称)
            System.name = System.shell();
            //对版本号进行过滤过处理
            //	System.version = System.versionFilter(System.version);

        } catch (e) {
        }
        return {
            client: System
        };

    })(window);
    if (Browser.client.name == undefined || Browser.client.name=="") {
        Browser.client.name = "Unknown";
        Browser.client.version = "Unknown";
    }else if(Browser.client.version == undefined){
        Browser.client.version = "Unknown";
    }
    return Browser;
}

/**
 * 打开询问框
 */
const openNotification = (): void => {
    Notification.requestPermission().then(permission => {
        console.log(permission)
    })
}

export {notifyMe, openNotification}
// var httpLocation = "http://picclife.bxt189.com"; //测试环境
// var httpLocation = "http://t.bxt189.com";
// var httpLocation = "http://chinalife.bxt189.com"; //正式地址
var httpLocation = "http://192.168.19.212:8080"; //正式地址
// var serverLocation = httpLocation + "/gskd/pro/"; //测试地址
var serverLocation = httpLocation + "/edt/pro/"; //测试地址
// var renewserverLocation = httpLocation + "/gskd/"; //测试地址
var renewserverLocation = httpLocation + "/edt/"; //测试地址


// var httpLocation2 = "http://localhost:8080"; //测试地址
// var httpLocation2 = "http://58.53.209.99:5322"; //测试地址
var httpLocation2 = "http://picclife.bxt189.com"; //正式地址


function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }


    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}



function myAjax(myurl, mycallback, mydata) {
    $.ajax({
        url: myurl,
        type: 'POST',
        data: JSON.stringify(mydata),
        contentType: "application/json",
        dataType: 'json',
        success: function(backData) {
            $.loading.hideLoading();
            if (backData.code == "0") {
                mycallback(backData);
            } else if (backData.code == "1234") {
                mui.alert(backData.msg, "警告", function() {
                    //var orderCode = getUrlParam("orderCode");
                    //window.location.href = "card.html?orderCode="+orderCode;
                    getTabNo();
                });
            } else {
                mui.alert(backData.msg, "警告");
            }
        },
        error: function(x, y, z) {
            $.loading.hideLoading();
            mui.alert("获取数据异常!", "调用失败");
        }
    });
}

function getSendData(userInfo, data) {
    var sendData = { "token": "", "authentication": "", "data": {} };
    sendData.data = data || {};
    sendData.data.userId = userInfo.userId;
    sendData.data.imsiNo = userInfo.imsiNo;
    if (userInfo.authentication == undefined) {
        sendData.authentication = userInfo.token;
    } else {
        sendData.authentication = userInfo.authentication;
    }
    sendData.token = userInfo.token;
    return sendData;
}
//调用接口获取数据通用方法
function GetData(url, callback, data, isShowLoading) {

    isShowLoading = (arguments.length <= 3) ? true : isShowLoading;
    if (isShowLoading) {
        $.loading.showLoading();
    }

    var sendUrl = serverLocation + url;
    var userInfo;
    var wxcardNo = getUrlParam("wxcardNo");
    var prdId = getUrlParam("prdId");
    if (wxcardNo && prdId) {
        var userTest = {
            "token": "aa",
            "userId": "13",
            "imsiNo": "46002",
            "authentication": "H4sIAAAAAAAAAH2Ry27TQBSGp6EFVW1BgjVSETuqOo4vSUxVCadx0lyapHFzabpAk5mp40tsxzNOnSLxAEhsEG/QLXQNS94AeAkuUtewYIFTUkFRQbM5c/TrfJ/OeXUGFmgAHiFvyFnB0cDCHCUoDEw24fzAG5uYBFyLksCFQ9KAlB55AVZDNiAuMxFkpufueTZxy9+efd3cPt1KgEQVLKGA4GkAOpSB21ULjmHSga6R1FlgusZGFSz6cYFMHzqXA/W+RRDbiAKQ/a+S2qcsgIhdofJC+sA3T16+TYBrPbACfwcIPgBL078XzzJJrHbn4Cq3G5gwaDp0BJ6CROTPhcFFkJsGuVnw9cf2py93nxQTAEQ+AGCOgQTG8TK5qblB7Zl3rK3pzAtIh/Qv6+bPOZ3P73fhm/vPY98qmEceJlPwXBVcR55nmxe/RZNqEZue4rwRzTh/byg0uX9wTh7svDs7vfn9nLPseAg6KsYBoXRGWAnI0GPkcnORxnU8o4R/YX0GbvEP/3ypqzqrKq8qcjbNZ3JKSimk1KzIK5IsF9LCFp/JZgQG5ifHKL7+j7Ku6XqpXivlN8sSb7ZVcUcSsTDmc6mJ2M20B7l6JhocdvabzbrZdRy76FfW3Z7FG8XG8XrhnsBnxayiCKK0sZqrafrjPwbW7GgU9lKh1ef1qK6yyRpSw2Zqp9KQO6qddosasrr9XBL11Ep2d6gNj+VGuG05Xqsk1Lt7tIXDitrSoVhIi5JtucZuNNTyoW2EZRgarXH+EKllGY66RfmQ0LqEDXUvJ1WOVKdX2xaVitDcolhmKd3Mj+3BoB0FI7+WayWHih1OlLU1BgADy4Iz0aDIh/uSt8nAgoUIZj8BqOMtRJkDAAA="
        };
        console.info(data);
        console.info(sendData);
        var sendData = getSendData(userTest, data);
        myAjax(sendUrl, callback, sendData);
    } else if (mui.os.android) {
        var policyId = getUrlParam("policyId");
        var cardNo = getUrlParam("cardNo");
        if (policyId && cardNo) {
            // $("#debugBack").show();
            // var userTest = { "token": "aa", "userId": "13", "imsiNo": "46002", "authentication": "H4sIAAAAAAAAAH2Ry27TQBSGp6EFVW1BgjVSETuqOo4vSUxVCadx0lyapHFzabpAk5mp40tsxzNOnSLxAEhsEG/QLXQNS94AeAkuUtewYIFTUkFRQbM5c/TrfJ/OeXUGFmgAHiFvyFnB0cDCHCUoDEw24fzAG5uYBFyLksCFQ9KAlB55AVZDNiAuMxFkpufueTZxy9+efd3cPt1KgEQVLKGA4GkAOpSB21ULjmHSga6R1FlgusZGFSz6cYFMHzqXA/W+RRDbiAKQ/a+S2qcsgIhdofJC+sA3T16+TYBrPbACfwcIPgBL078XzzJJrHbn4Cq3G5gwaDp0BJ6CROTPhcFFkJsGuVnw9cf2py93nxQTAEQ+AGCOgQTG8TK5qblB7Zl3rK3pzAtIh/Qv6+bPOZ3P73fhm/vPY98qmEceJlPwXBVcR55nmxe/RZNqEZue4rwRzTh/byg0uX9wTh7svDs7vfn9nLPseAg6KsYBoXRGWAnI0GPkcnORxnU8o4R/YX0GbvEP/3ypqzqrKq8qcjbNZ3JKSimk1KzIK5IsF9LCFp/JZgQG5ifHKL7+j7Ku6XqpXivlN8sSb7ZVcUcSsTDmc6mJ2M20B7l6JhocdvabzbrZdRy76FfW3Z7FG8XG8XrhnsBnxayiCKK0sZqrafrjPwbW7GgU9lKh1ef1qK6yyRpSw2Zqp9KQO6qddosasrr9XBL11Ep2d6gNj+VGuG05Xqsk1Lt7tIXDitrSoVhIi5JtucZuNNTyoW2EZRgarXH+EKllGY66RfmQ0LqEDXUvJ1WOVKdX2xaVitDcolhmKd3Mj+3BoB0FI7+WayWHih1OlLU1BgADy4Iz0aDIh/uSt8nAgoUIZj8BqOMtRJkDAAA=" };
            // var sendData = getSendData(userTest, data);
            // myAjax(sendUrl, callback, sendData);

            var userInfoStr = window.androidx.getUserInfo(url);
            console.log("userInfoStr" + userInfoStr);
            userInfo = JSON.parse(userInfoStr);
            var sendData = getSendData(userInfo, data);
            myAjax(sendUrl, callback, sendData);
        } else {
            var userInfoStr = window.androidx.getUserInfo(url);
            console.log("userInfoStr" + userInfoStr);
            userInfo = JSON.parse(userInfoStr);
            var sendData = getSendData(userInfo, data);
            myAjax(sendUrl, callback, sendData);
        }


    } else if (mui.os.ios) {
        setupWebViewJavascriptBridge(function(bridge) {
            bridge.registerHandler('testJSFunction', function(data, responseCallback) {
                alert('JS方法被调用:' + data);
                responseCallback('js执行过了');
            })
        });

        WebViewJavascriptBridge.callHandler('getUserInfo', { 'url': url }, function(response) {
            userInfo = JSON.parse(response);
            var sendData = getSendData(userInfo, data);
            myAjax(sendUrl, callback, sendData);
        });
    } else {
        var userTest = {
            "token": "aa",
            "userId": "13",
            "imsiNo": "46002",
            "authentication": "H4sIAAAAAAAAAH2Ry27TQBSGp6EFVW1BgjVSETuqOo4vSUxVCadx0lyapHFzabpAk5mp40tsxzNOnSLxAEhsEG/QLXQNS94AeAkuUtewYIFTUkFRQbM5c/TrfJ/OeXUGFmgAHiFvyFnB0cDCHCUoDEw24fzAG5uYBFyLksCFQ9KAlB55AVZDNiAuMxFkpufueTZxy9+efd3cPt1KgEQVLKGA4GkAOpSB21ULjmHSga6R1FlgusZGFSz6cYFMHzqXA/W+RRDbiAKQ/a+S2qcsgIhdofJC+sA3T16+TYBrPbACfwcIPgBL078XzzJJrHbn4Cq3G5gwaDp0BJ6CROTPhcFFkJsGuVnw9cf2py93nxQTAEQ+AGCOgQTG8TK5qblB7Zl3rK3pzAtIh/Qv6+bPOZ3P73fhm/vPY98qmEceJlPwXBVcR55nmxe/RZNqEZue4rwRzTh/byg0uX9wTh7svDs7vfn9nLPseAg6KsYBoXRGWAnI0GPkcnORxnU8o4R/YX0GbvEP/3ypqzqrKq8qcjbNZ3JKSimk1KzIK5IsF9LCFp/JZgQG5ifHKL7+j7Ku6XqpXivlN8sSb7ZVcUcSsTDmc6mJ2M20B7l6JhocdvabzbrZdRy76FfW3Z7FG8XG8XrhnsBnxayiCKK0sZqrafrjPwbW7GgU9lKh1ef1qK6yyRpSw2Zqp9KQO6qddosasrr9XBL11Ep2d6gNj+VGuG05Xqsk1Lt7tIXDitrSoVhIi5JtucZuNNTyoW2EZRgarXH+EKllGY66RfmQ0LqEDXUvJ1WOVKdX2xaVitDcolhmKd3Mj+3BoB0FI7+WayWHih1OlLU1BgADy4Iz0aDIh/uSt8nAgoUIZj8BqOMtRJkDAAA="
        };
        var sendData = getSendData(userTest, data);

        myAjax(sendUrl, callback, sendData);
    }
}

//调用接口获取数据通用方法
function GetData2(url, callback, data) {
    GetData(url, callback, data, false);
}

//获取页面url后面参数的值
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

//APP提供的方法，打印凭证
function printTicket(orderId) {
    console.log("调用打印方法:" + orderId);
}


function emailAssit(id) {
    var popHtml = "<div id='" + id + "_middlePopover' class='mui-popover' style='position:fixed;top:30%;right:1%;;'>" +
        "<div class='mui-scroll-wrapper'>" +
        "<div class='mui-scroll'><ul class='mui-table-view'></ul></div></div></div>";
    $("body").append(popHtml);
    mui('.mui-scroll-wrapper').scroll();

    var mailList = new Array('@qq.com', '@126.com', '@163.com', '@sina.com',
        '@hotmail.com', '@gmail.com', '@yahoo.com.cn', '@sohu.com', '@189.cn');

    $("#" + id).bind("keyup", function() {
        var val = $(this).val();
        if (val == '' || val.indexOf("@") > -1) {
            mui('#' + id + '_middlePopover').popover('hide');
            return false;
        }
        var $muiTableView = $('#' + id + '_middlePopover').find('.mui-table-view');

        $muiTableView.empty();
        for (var i = 0; i < mailList.length; i++) {
            var emailText = $(this).val();
            $muiTableView.append("<li class='mui-table-view-cell'>" + emailText + mailList[i] + "</li>");
            var $muiTableViewCell = $('#' + id + '_middlePopover').find('.mui-table-view-cell');
            $muiTableViewCell.on("click", function() {
                //$("#select2").html($(this).children().html());
                mui('#' + id + '_middlePopover').popover('hide');
                $("#" + id).val($(this).html());
            });
        }
        mui('#' + id + '_middlePopover').popover('show');

    });
}

function getTabNo() {
    if (mui.os.android) {
        try {
            if ((window.androidx.getAppTab) && typeof(window.androidx.getAppTab) == "function") {
                var tabNo = window.androidx.getAppTab();
                mui.alert(tabNo);
                console.log(tabNo);
                if (tabNo == 0) {
                    window.androidx.backHome()

                    // window.location.href = "advertise.html";
                } else if (tabNo == 1) {
                    window.location.href = "category.html";
                } else {
                    window.androidx.backHome();
                }
            }
        } catch (e) {
            // window.location.href = "advertise.html";
            window.androidx.backHome()

        }

    } else if (mui.os.ios) {
        setupWebViewJavascriptBridge(function(bridge) {
            bridge.registerHandler('testJSFunction', function(data, responseCallback) {
                alert('JS方法被调用:' + data);
                responseCallback('js执行过了');
            })
        });

        WebViewJavascriptBridge.callHandler('getAppTab', {}, function(response) {
            var tabNo = response;
            if (tabNo == 0) {
                // window.location.href = "advertise.html";
                iosGoBack();

            } else if (tabNo == 1) {
                window.location.href = "category.html";
            } else {
                iosGoBack();
            }
        });
    }
}



function getTabNo2() {
    if (mui.os.android) {
        try {
            // if ((window.androidx.getAppTab) && typeof(window.androidx.getAppTab) == "function") {
            //     var tabNo = window.androidx.getAppTab();
            //     mui.alert(tabNo);
            //     console.log(tabNo);
            //     if (tabNo == 0) {
            //         window.location.href = "advertise.html";
            //     } else if (tabNo == 1) {
            //         window.location.href = "category.html";
            //     } else {
            //         window.androidx.back();
            //     }
            // }
            window.androidx.backHome()
                // window.history.back();
                // window.history.back();
                // window.history.back();
                // window.history.back();
                // window.history.back();
                // window.history.back();

        } catch (e) {
            // window.location.href = "advertise.html";
            window.androidx.backHome()

        }

    } else if (mui.os.ios) {
        setupWebViewJavascriptBridge(function(bridge) {
            bridge.registerHandler('testJSFunction', function(data, responseCallback) {
                alert('JS方法被调用:' + data);
                responseCallback('js执行过了');
            })
        });

        WebViewJavascriptBridge.callHandler('getAppTab', {}, function(response) {
            var tabNo = response;
            if (tabNo == 0) {
                // window.location.href = "advertise.html";
                iosGoBack();

            } else if (tabNo == 1) {
                window.location.href = "category.html";
            } else {
                iosGoBack();
            }
        });
    }
}




function agent_type_check() {
    var agent_type = navigator.userAgent.toLowerCase();
    var isWeixin = agent_type.indexOf('micromessenger') != -1;
    var isQQ = agent_type.indexOf('mobilemqqbrowser') == -1;
    if (!isWeixin && isQQ) {
        myApp.alert('请用微信打开!', function() {
            window.location.href = 'weixin://wechatguide.html'
        })
    }
}

function JSFunc() {

}
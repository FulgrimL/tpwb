// var httpLocation = "http://picclife.bxt189.com"; //测试环境
 var httpLocation = "http://192.168.19.212:8080"; //测试环境
// var httpLocation = "http://t.bxt189.com";
//var httpLocation = "http://chinalife.bxt189.com"; //正式地址
// var serverLocation = httpLocation + "/gskd/pro/"; //测试地址
var serverLocation = httpLocation + "/edt/pro/"; //测试地址
// var renewserverLocation = httpLocation + "/gskd/"; //测试地址
var renewserverLocation = httpLocation + "/edt/"; //测试地址

/*表单校验部分*/
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
var ValidCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
$.valid = {
    isName: function(Name) {
        //加点英文名正则表达式
        //if(!Name.match(/[\u4e00-\u9fa5]{1,20}$|[a-zA-Z\.\s]{1,20}$/)){
        //https://segmentfault.com/q/1010000007260985—/^([u4e00-u9fa5·s]{1,20}|[a-zA-Z.s]{1,20})$/
        //https://zhidao.baidu.com/question/84019611.html—if(/^[a-zA-Z ]{1,20}$/.test(s)||/^[\u4e00-\u9fa5]{1,10}$/.test(s))
        //if(/^[a-zA-Z.s ]{2,20}$/.test(Name)||/^[\u4e00-\u9fa5·s]{2,20}$/.test(Name)){
        if (/^[\u4e00-\u9fa5a-zA-Z\s\.•]*$/.test(Name)) {
            return true;
        } else {
            return false;
        }
    },
    isIdCard: function(code) {
        var code = code.toUpperCase();

        var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
        var tip = "";
        var pass = true;
        /*
         if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
         tip = "身份证号格式错误";
         pass = false;
         }

         else if(!city[code.substr(0,2)]){
         tip = "地址编码错误";
         pass = false;
         }
         else{*/
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                tip = "校验位错误";
                pass = false;
            }
        } else {
            pass = false;
        }
        //}
        //if(!pass) alert(tip);
        return pass;
    },
    //通过身份证获取age/sex/birthday
    isId_age_birthday_sex: function(certificateNo) {
        //身份证校验部分
        var pat = /^\d{6}(((19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}([0-9]|x|X))|(\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}))$/;
        if (!pat.test(certificateNo))
            return false;
        var parseInner = function(certificateNo, idxSexStart, birthYearSpan) {
            var res = {};
            var idxSex = 1 - certificateNo.substr(idxSexStart, 1) % 2;
            res.sex = idxSex == '1' ? '女' : '男';

            var year = (birthYearSpan == 2 ? '19' : '') + certificateNo.substr(6, birthYearSpan);
            var month = certificateNo.substr(6 + birthYearSpan, 2);
            var day = certificateNo.substr(8 + birthYearSpan, 2);
            res.birthday = year + '-' + month + '-' + day;

            var d = new Date(); //当然，在正式项目中，这里应该获取服务器的当前时间
            var monthFloor = ((d.getMonth() + 1) < parseInt(month, 10) || (d.getMonth() + 1) == parseInt(month, 10) && d.getDate() < parseInt(day, 10)) ? 1 : 0;
            res.age = d.getFullYear() - parseInt(year, 10) - monthFloor;
            return res;
        };
        //debugger;
        //调用parseInner = function(certificateNo, idxSexStart, birthYearSpan){}
        return parseInner(certificateNo, certificateNo.length == 15 ? 14 : 16, certificateNo.length == 15 ? 2 : 4);
    },
    isPhoneNumber: function(phoneNumber) {
        if (!phoneNumber.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
            return false;
        } else {
            return true;
        }
    }
}


$.each($('input'), function(x, y) {
    console.log('each');
    switch (x) {
        case 2:
            $(y).blur(function() {
                console.log(2);

                if ($(y).val() == '' || $(y).val() != '' && !$.valid.isName($(y).val())) {
                    mui.alert('请输入您的真实姓名!');
                    $(y).attr('test', 'false');
                } else if ($(y).val() != '' && $.valid.isName($(y).val())) {
                    $(y).attr('test', 'true');
                }
            })
            break;
        case 4:
            $(y).blur(function() {
                console.log(4);

                if ($(y).val() == '' || ($(y).val() != '' && !$.valid.isIdCard($(y).val()))) {
                    mui.alert('请输入正确的身份证号码!')
                    console.log($.valid.isIdCard($(y).val()))
                    $(y).attr('test', 'false');
                } else if ($.valid.isIdCard($(y).val())) {
                    $(y).attr('test', 'true');
                }
                console.log(JSON.stringify($.valid.isId_age_birthday_sex($(y).val()))) //--->{"sex":"男","birthday":"1993-11-02","age":23}
            })
            break;
        case 5:
            $(y).blur(function() {
                console.log(5);
                if ($(y).val() != '' && !$.valid.isPhoneNumber($(y).val())) {
                    mui.alert('请输入正确的手机号码!')
                    $(y).attr('test', 'false');
                } else if ($.valid.isPhoneNumber($(y).val())) {
                    $(y).attr('test', 'true');
                }
            })
            break;
    }
})

// function check_all() {
//     var signal = true;
//     var alert_name = ['请输入您的真实姓名!', '请输入正确的身份证号码!', '请输入正确的手机号码!'];

//     for (var i = 0; i < $('input').length; i++) {
//         //$.each($('input'),function(x,y){})/Framework7重大缺陷－－－return false/无法跳出each循环
//         var name = $('input').eq(i).attr('test_name');
//         var property = $('input').eq(i).attr('test');
//         var notNull = $('input').eq(i).attr('notNull');
//         var invis = $('input').eq(i).hasClass('xpx_invis');
//         if (name != 'school' && name != 'grade' && name != 'class' && name != 'date' && property == 'false') {
//             mui.alert(alert_name[i]);
//             signal = false;
//             return false
//         } else if (name == 'school' && notNull == 'true' && invis == false && $('#select101').val() == '') {
//             mui.alert('请输入正确的学校名称!');
//             signal = false;
//             return false
//         } else if (name == 'grade' && notNull == 'true' && invis == false && property == 'false' && $('#select102').val() == '') {
//             mui.alert('请选择年级必填项!');
//             signal = false;
//             return false
//         } else if (name == 'class' && notNull == 'true' && invis == false && property == 'false' && $('#select103').val() == '') {
//             mui.alert('请选择班级必填项!');
//             signal = false;
//             return false
//         } else if (name == 'date' && notNull == 'true' && invis == false && property == 'false' && $('#select104').val() == '') {
//             mui.alert('请选择生效日期!');
//             signal = false;
//             return false
//         } else if (i == $('input').length - 1 && $('#img_change').children('img').attr('status') == '0') {
//             mui.alert('请阅读投保声明!');
//             signal = false;
//             return false
//         }
//     }
//     return signal;
// }








//夏力form提交
function post(apiUrl, dataDetails, md5Code) {
    var URL = apiUrl;
    var PARAMS = { dataDetails: dataDetails, md5Code: md5Code }
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.style.display = "none";
    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        // alert(opt.name)
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    debugger;
    console.log(temp);
    temp.submit();
    return temp;
}




function ajax_self_data(y) {
    $.ajax({
        url: renewserverLocation + 'xpx/xpxwxpaydata',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({ 'orderCode': y, 'mailFlag': $.parseUrlQuery(string).mailFlag }),
        success: function(data, status, xhr) {
            data = JSON.parse(data);
            if (data.code == '0') {
                var formHTML = Template7.templates.formTemplate({
                    apiUrl: data.data.apiUrl,
                    dataDetails: data.data.dataDetails,
                    md5Code: data.data.md5Code
                });
                $('body').append(formHTML);
                //debugger;
                $('form').submit();
            } else {
                mui.hidePreloader();
                mui.alert(data.msg);
            }

            //post(data.data.apiUrl,data.data.dataDetails,data.data.md5Code);
            //夏力form表单DOM
            /*<form action="http://eshop.e-chinalife.com/MainAction.do?cmd=main&amp;_fccode=1028001&amp;storeCode=JCEDTUB" method="post" style="display: none;">
            <textarea name="dataDetails"></textarea>
            <textarea name="md5Code"></textarea>
            </form>*/
        }
    })
}


function ajax_base_data(x) {
    $.ajax({
        url: renewserverLocation + 'xpx/addOrderAndOutOrder',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify(x),
        success: function(data) {
            data = JSON.parse(data);
            if (data.code == '0') {
                console.log(data.data);
                ajax_self_data(data.data.orderCode)
            } else {
                mui.hidePreloader();
                mui.alert(data.msg);
            }
            /*//清空源数组
            ajax_temp_data = [];
            for(var i=0;i<data.data.length;i++){
                ajax_temp_data.push(data.data[i].schoolName)
            }
            //caseBB:success回调获取数据有效
            school_auto_complete.open()
            console.log(ajax_temp_data)*/
        },
        error: function(xhr, status) {
            mui.hidePreloader();
            mui.alert('系统忙请稍后再试！');
        }
    })
}


function get_base_data() {
    var base_data = [{
        "PRDNAME": "学平险测试产品",
        "MEMO": "1.意外伤害身故/伤残  30000.00元  \n2.意外伤害医疗  10000.00元",
        "PRDPREM": "0.01",
        "VALIDDATE": $('#select104').val(),
        "VALIDTIME": "" + moment().format('HH:mm') + "",
        "INSURDUR_TEXT": "1年",
        "INSURDUR": "Y1",
        "ENDDATE": $('#select105').val(),
        "ISDNAME": $('input').eq(3).val(),
        "ISDIDTYPE_TEXT": "身份证",
        "ISDIDTYPE": "I",
        "ISDIDNO": $('input').eq(4).val(),
        "ISDBIRTH": $.valid.isId_age_birthday_sex($('input').eq(4).val()).birthday,
        "ISDGENDER_TEXT": $.valid.isId_age_birthday_sex($('input').eq(4).val()).sex,
        "ISDGENDER": $.valid.isId_age_birthday_sex($('input').eq(4).val()).sex == '男' ? 'M' : 'F',
        "ISDMOBILE": $('input').eq(2).val(),
        "ISDEMAIL": "",
        "SCHOOL": $('#select101').val(),
        "GRADE": $('#select102').val(),
        "CLASS": $('#select103').val(),
        "APPLICANT": {
            "APPRLT_TEXT": sessionStorage.relation_text,
            "APPRLT": sessionStorage.relation,
            "APPNAME": $('input').eq(0).val(),
            "APPIDTYPE_TEXT": "身份证",
            "APPIDTYPE": "I",
            "APPIDNO": $('input').eq(1).val(),
            "APPGENDER_TEXT": $.valid.isId_age_birthday_sex($('input').eq(1).val()).sex,
            "APPGENDER": $.valid.isId_age_birthday_sex($('input').eq(1).val()).sex == '男' ? 'M' : 'F',
            "APPBIRTH": $.valid.isId_age_birthday_sex($('input').eq(1).val()).birthday,
            "APPMOBILE": $('input').eq(2).val(),
            "APPEMAIL": ""
        },
        "BENEFICIARY": []
    }];
    return base_data
}

function getJson() {
    base_data = [{ "PRDNAME": "尊享如意卡", "MEMO": "1.汽车意外伤害  5000.00元\n2.轮船意外伤害  10000.00元\n3.火车意外伤害  35000.00元\n4.飞机意外伤害  100000.00元", "PRDPREM": "1.00", "VALIDDATE": "2017-07-27", "VALIDTIME": "14:46", "INSURDUR_TEXT": "1年", "INSURDUR": "Y1", "ENDDATE": "2018-07-26", "ISDNAME": "承认电话", "ISDIDTYPE_TEXT": "身份证", "ISDIDTYPE": "I", "ISDIDNO": "422801199208220637", "ISDBIRTH": "1992-08-22", "ISDPROFCODE": "000000", "ISDPROFTYPE": "1", "ISDPROFTEXT": "无职业", "ISDGENDER_TEXT": "男", "ISDGENDER": "M", "ISDMOBILE": "18333333333", "ISDEMAIL": "", "APPLICANT": { "APPRLT_TEXT": "本人", "APPRLT": "M", "APPNAME": "承认电话", "APPIDTYPE_TEXT": "身份证", "APPIDTYPE": "I", "APPIDNO": "422801199208220637", "APPGENDER_TEXT": "男", "APPGENDER": "M", "APPBIRTH": "1992-08-22", "APPMOBILE": "18333333333", "APPEMAIL": "" }, "BENEFICIARY": [] }];
    return base_data

}

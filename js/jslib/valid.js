var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1] // 加权因子
var ValidCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 身份证验证位值.10代表X
jQuery.valid = {
    /**
     * 校验身份证
     * @param idCard 身份证号码数组
     * @return
     */
    isIdCard: function(idCard) {
        if (
            $.valid.isValidityBrithBy18IdCard(idCard) &&
            $.valid.isTrueValidateCodeBy18IdCard(idCard)
        ) {
            return true
        } else {
            return false
        }
    },
    /**
     * 验证18位数身份证号码中的生日是否是有效生日
     * @param idCard 18位书身份证字符串
     * @return
     */
    isValidityBrithBy18IdCard: function(idCard18) {
        if (idCard18) {
            var year = idCard18.substring(6, 10)
            var month = idCard18.substring(10, 12)
            var day = idCard18.substring(12, 14)
            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
                // 这里用getFullYear()获取年份，避免千年虫问题
            if (
                temp_date.getFullYear() != parseFloat(year) ||
                temp_date.getMonth() != parseFloat(month) - 1 ||
                temp_date.getDate() != parseFloat(day)
            ) {
                return false
            } else {
                return true
            }
        }
    },
    /**
     * 判断身份证号码为18位时最后的验证位是否正确
     * @param a_idCard 身份证号码数组
     * @return
     */
    isTrueValidateCodeBy18IdCard: function(a_idCard) {
        var sum = 0 // 声明加权求和变量
        if (a_idCard[17].toLowerCase() == 'x') {
            a_idCard[17] = 10 // 将最后位为x的验证码替换为10方便后续操作
        }
        for (var i = 0; i < 17; i++) {
            sum += Wi[i] * a_idCard[i] // 加权求和
        }
        valCodePosition = sum % 11 // 得到验证码所位置
        if (a_idCard[17] == ValidCode[valCodePosition]) {
            return true
        } else {
            return false
        }
    },
    /**
     * 验证是否是合法手机号
     * @param phoneNumber 手机号
     * @return
     */
    isPhoneNumber: function(phoneNumber) {

        // 新校验规则
        // if (phoneNumber.substring(0, 5) == "0086+") {
        //     if (!phoneNumber.substring(5).match(/^[1][3,4,5,6,7,8][0-9]{9}$/)) {
        //         return false
        //     } else {
        //         return true
        //     }
        // } else {
        //     return false
        // }

        if (!phoneNumber.match(/^[1][3,4,5,6,7,8][0-9]{9}$/)) {
            return false
        } else {
            return true
        }


    },
    /**
     * 邮箱自动补全
     * @param id 提示框id
     * @return
     */
    emailAssist: function(id) {
        var popHtml =
            "<div id='middlePopover' class='mui-popover'>" +
            "<div class='mui-popover-arrow'></div><div class='mui-scroll-wrapper'>" +
            "<div class='mui-scroll'><ul class='mui-table-view'></ul></div></div></div>"
        $('#' + id)
            .parent()
            .after(popHtml)
        mui('.mui-scroll-wrapper').scroll()

        var mailList = new Array(
            '@qq.com',
            '@126.com',
            '@163.com',
            '@sina.com',
            '@hotmail.com',
            '@gmail.com',
            '@yahoo.com.cn',
            '@sohu.com',
            '@189.cn'
        )

        $('#' + id).bind('keyup', function() {
            var val = $(this).val()
            if (val == '' || val.indexOf('@') > -1) {
                mui('#middlePopover').popover('hide')
                return false
            }
            $('.mui-table-view').empty()
            for (var i = 0; i < mailList.length; i++) {
                var emailText = $(this).val()
                $('.mui-table-view').append(
                    "<li class='mui-table-view-cell'>" + emailText + mailList[i] + '</li>'
                )
            }
            mui('#middlePopover').popover('show')

            $('.mui-table-view-cell').on('tap', function() {
                //$("#select2").html($(this).children().html());
                mui('#middlePopover').popover('hide')
                $('#' + id).val($(this).html())
            })
        })
    },
    isIdCard2: function(code) {
        var code = code.toUpperCase()

        var city = {
            11: '北京',
            12: '天津',
            13: '河北',
            14: '山西',
            15: '内蒙古',
            21: '辽宁',
            22: '吉林',
            23: '黑龙江 ',
            31: '上海',
            32: '江苏',
            33: '浙江',
            34: '安徽',
            35: '福建',
            36: '江西',
            37: '山东',
            41: '河南',
            42: '湖北 ',
            43: '湖南',
            44: '广东',
            45: '广西',
            46: '海南',
            50: '重庆',
            51: '四川',
            52: '贵州',
            53: '云南',
            54: '西藏 ',
            61: '陕西',
            62: '甘肃',
            63: '青海',
            64: '宁夏',
            65: '新疆',
            71: '台湾',
            81: '香港',
            82: '澳门',
            91: '国外 '
        }
        var tip = ''
        var pass = true
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
            code = code.split('')
                //∑(ai×Wi)(mod 11)
                //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
                //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
            var sum = 0
            var ai = 0
            var wi = 0
            for (var i = 0; i < 17; i++) {
                ai = code[i]
                wi = factor[i]
                sum += ai * wi
            }
            var last = parity[sum % 11]
            if (parity[sum % 11] != code[17]) {
                tip = '校验位错误'
                pass = false
            }
        } else {
            pass = false
        }
        //}
        //if(!pass) alert(tip);
        return pass
    },
    /**
     * 邮箱自动补全
     * @param id 提示框id
     * @return
     */
    isVehicleNumber: function(vehicleNumber) {
        var result = false;
        if (vehicleNumber.length == 7) {
            var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
            result = express.test(vehicleNumber)
        } else if (vehicleNumber.length == 8) {
            var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{1}[0-9]{4}[A-Z0-9挂学警港澳]{1}$/
            result = express.test(vehicleNumber)
        }
        return result
    },

    // 校验姓名规则
    isVehicleName: function(VehicleName) {
        var result = false;
        var express = /^([\u4E00-\u9FA5\uf900-\ufa2d·s]{2,200}|([a-zA-Z]+\.?-?·?\s?)+)$/
            // var express = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,200}$/
        result = express.test(VehicleName);
        return result;
    },

    //校验地址规则
    isVehicleAds: function(VehicleAds) {
        var result = false;
        //   var express = /^([\u4E00-\u9FA5\uf900-\ufa2d·s]{2,200}|([a-zA-Z]+\.?-?·?\s?)+)$/
        //   result = express.test(VehicleName);
        if (VehicleAds.length > 5 && VehicleAds.length < 200) {
            result = true;
        } else {
            result = false;
        }
        return result;
    },
    // 校验邮箱规则
    isVehicleMail: function(isVehicleMail) {
        var result = false;
        var express = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
            // var express = /^([\u4E00-\u9FA5\uf900-\ufa2d·s]{2,200}|([a-zA-Z]+\.?-?·?\s?)+)$/
            // var express = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,200}$/
        result = express.test(isVehicleMail);
        return result;
    },
}